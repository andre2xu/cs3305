# import flask modules
from flask import Flask, render_template, request, session, redirect, url_for, g 
from database import get_db, close_db
from forms import RegistrationForm, LoginForm, StartGameForm
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps




app = Flask(
    __name__,
    template_folder='./templates',
    static_folder='./static'
)
app.config["SECRET_KEY"] = "secretkeycs3305"
app.config["SESSION_PERMAMENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['SESSION_FILE_THRESHOLD'] = 1 
Session(app)


"""Global variables"""
Difficulty = 5
Sound = 5
Music = 5


"""Decorator to disconnect from database after use"""
@app.teardown_appcontext
def close_db_at_end_of_request(e=None):
    close_db(e)


"""Decorator at beginning of request to look into session and see if user id is logged in"""
@app.before_request
def load_logged_in_user():
    g.user = session.get("username", None)
    

"""Decorator to allow users to access specific pages after login"""
def login_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        # if user is not logged in - redirect to login page
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(**kwargs)
    return wrapped_view


"""Decorator to send index.html to root directory"""
@app.route("/")     
def index():
    return render_template("index.html", title="Main Menu")


"""Decorator to register a new player"""
@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        password2 = form.password2.data
        db = get_db()        
        # check if duplicate username exists
        if db.execute("""SELECT username FROM users WHERE username = ?""", (username,)).fetchone() is not None:
            form.username.errors.append("Invalid username. Please try again.")
        elif password != password2:
            form.password2.errors.append("Passwords do not match. Please try again.")
        else:
            db.execute("""INSERT INTO users (username, password) VALUES (?, ?)""", (username, generate_password_hash(password)))
            db.commit()
            return redirect(url_for("login"))
    return render_template("register.html", title="Register Here", form=form)


"""Decorator to login to access the game"""
@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        db = get_db()
        user = db.execute("""SELECT * FROM users WHERE username = ?""", (username,)).fetchone()
        if user is None:
            form.username.errors.append("The zombies stole your identity. Please try again.")
        # check password matches - first get one from the database, then compare with what user has typed in.
        elif not check_password_hash(user["password"], password):
            form.password.errors.append("The zombies ate your password. Please try again.")
        else:
            session.clear()   
            #if your username is in the dictionary
            #session["username"] = user["username"]
            session["username"] = username
            # then you are logged in
            ##next_page = request.args.get("next")
            ##if not next_page:
            ##    next_page = url_for("startgame")
            # get taken back to the page that you are on
            ##return redirect(next_page)
            return redirect(url_for("startgame"))
    return render_template("login.html", title="Player Login", form=form)


"""Decorator to display the help.html page"""
@app.route("/help", methods=["GET", "POST"])
def help():
    return render_template("help.html")


""" Decorator for credits page """
@app.route("/credits", methods=["GET", "POST"])
def credits():
    return render_template("credits.html", title="Credits")


"""Decorator to display the startgame.html page"""
@app.route("/startgame", methods=["GET", "POST"])
@login_required
def startgame():
    form = StartGameForm()
    if form.validate_on_submit():    
        return redirect (url_for("game"))
    return render_template("startgame.html", title="Start Game", form=form)


"""Decorator to play the game"""
@app.route("/game", methods=["GET"])
@login_required
def game():
    return render_template("game.html")


"""Decorator to change the settings of the game"""
@app.route("/settings", methods=["GET", "POST"])
@login_required
def settings():
    if request.method == 'POST':
        if request.form.get('MinusDifficulty') == '-':
            Difficulty -=1

        elif request.form.get('IncreaseDifficulty') == '+':
            Difficulty +=1

    elif request.method == 'GET':
        return render_template("settings.html", Difficulty_Level=Difficulty, Sound=Sound , Music=Music, form=form)
    return render_template("settings.html", Difficulty_Level = Difficulty, Sound = Sound , Music = Music)


"""Decorator to store the score of the player"""
@app.route("/store_score", methods=["POST"])
@login_required
def store_score():
    # { millisecondsSurvived: ?, pointsEarned: ? }
    game_data = request.get_json()

    time_survived = game_data['millisecondsSurvived']
    points_earned = game_data['pointsEarned']

    username = g.user

    db = get_db()
    db.execute("""INSERT INTO leaderboard (username, score, time_survived) VALUES (?, ?, ?);""", (username, points_earned, time_survived))
    db.commit()

    return "" # leave this as an empty string. Also, no other return is needed


"""Decorator to view the leaderboard"""
@app.route("/leaderboard", methods=["GET", "POST"])
@login_required
def leaderboard():
    db = get_db()
    leaderboard_data = db.execute("""SELECT * FROM leaderboard ORDER BY score, score ASC""").fetchall()

    users = []
    scores = []
    time_survived = []

    for player_game_data in leaderboard_data:
        users.append(player_game_data[0])
        scores.append(player_game_data[1])

        time = player_game_data[2]

        hrs = round(time / 3.6e+6)
        mins = round(time / 60000)
        secs = round(time / 1000)

        hrs_formatted = '0'
        mins_formatted = '0'
        secs_formatted = '0'

        if hrs > 0:
            hrs_formatted = f'{hrs}'
        if mins > 0:
            mins_formatted = f'{mins}'
        if secs > 0:
            secs_formatted = f'{secs}'

        time_survived.append(f'{hrs_formatted}h:{mins_formatted}m:{secs_formatted}s')

    return render_template("leaderboard.html", title="Leaderboard", users=users, scores=scores, time_survived=time_survived)


"""Decorator to quit or exit the game"""
@app.route("/quit", methods=["GET", "POST"])
@login_required
def quit():
    session.clear()
    return redirect(url_for("index"))

@app.route("/credit", methods=["GET", "POST"])
def credit():
    return render_template("credit.html", title = "Credits")


"""Decorator for error handling"""
"""Page not found"""
@app.errorhandler(404)
def page_not_found(error):
    return render_template("Oops! Please try again."), error==404

"""Bad request"""
@app.errorhandler(400)
def bad_request(error):
    return render_template("Non-comprehendo means we did not understand your language.  Check your spelling."), error==400

"""Internal server error"""
@app.errorhandler(500)
def internal_server_error(error):
    return render_template("The zombies are fixing the server error.  Do you want to help them?"), error==500

# demented for main menu
# harpsichord for playing game
# sound effect for clicking on buttons


if __name__ == "__main__":
    app.run(debug=True)
