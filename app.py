# import flask modules
from flask import Flask, flash, get_flashed_messages, render_template, request, session, redirect, url_for, g 
from database import get_db, close_db
from forms import RegistrationForm, LoginForm, StartGameForm
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps




app = Flask(__name__)
app.config["SECRET_KEY"] = "secretkeycs3305"
app.config["SESSION_PERMAMENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
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


"""Decorator to display the startgame.html page"""
@app.route("/startgame", methods=["GET", "POST"])
@login_required
def startgame():
    db = get_db()
    username = g.user 
    form = StartGameForm()
    if form.validate_on_submit():    
        return redirect (url_for("playgame"))
    return render_template("startgame.html", title="Start Game")


"""Decorator to play the game"""
@app.route("/playgame", methods=["GET", "POST"])
@login_required
def playgame():
    return render_template("playgame.html", title="Play the Game")


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
@app.route("/score", methods=["GET", "POST"])
@login_required
def storeScore():
    score = int(request.form["score"])
    db = get_db()
    username = g.user
    # additional validators
    if score <= 0:
        return "Score is below zero."
    # Here insert the score into the database
    else:
        db.execute("""INSERT INTO leaderboard (rank, user_id, score, time) VALUES (?, ?, ?, ?);""", (rank, user_id, score, time))
        db.commit()
        # if update is successful return success, otherwise return failure
    return "success"


"""Decorator to view the leaderboard"""
@app.route("/leaderboard", methods=["GET", "POST"])
@login_required
def leaderboard():
    db = get_db()
    details = db.execute("""SELECT * FROM score ORDER BY score, score ASC""").fetchall()
    details = list(details)
    scores = []
    for row in details:
        row = [item for item in row]
        scores.append(row)
    return render_template("leaderboard.html", title="Leaderboard", scores=scores)


"""Decorator to quit or exit the game"""
@app.route("/quit", methods=["GET", "POST"])
@login_required
def quit():
    session.clear()
    return redirect(url_for("index"))


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
