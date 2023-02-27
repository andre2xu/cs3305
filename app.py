# import flask modules
from flask import Flask, render_template, request, session, redirect, url_for, g 
from database import get_db, close_db
from forms import RegistrationForm, LoginForm, GameForm
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
    g.user = session.get("user_id", None)
    

"""Decorator to allow users to access specific pages after login"""
def login_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(**kwargs)
    return wrapped_view


"""Decorator to send index.html to root directory"""
@app.route("/")     
def index():
    return render_template("index.html", title="Main Menu")


"""Decorator to display the startgame.html page"""
@app.route("/startgame", methods=["GET", "POST"])
def startGame():
    return render_template("startgame.html", title="Start Game")


"""Decorator to play the game"""
@app.route("/game", methods=["GET", "POST"])
@login_required
def game():
    return render_template("game.html", title="Play the Game")


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
    form = GameForm()
    if form.validate_on_submit():
        db = get_db()
        score = form.score.data
        db.execute("""INSERT INTO score (score, username) VALUES (?, ?)""", (score, session["username"]))
        db.commit()
        return redirect(url_for("leaderboard"))
    else:
        return "Failed to update score"


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


"""Decorator to login to access the game"""
@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        db = get_db()
        user = db.execute("""SELECT * FROM users WHERE username = ?""", (form.username.data,)).fetchone()
        if user is None or not check_password_hash(user["password"], form.password.data):
            return redirect(url_for("login"))
        session.clear()
        session["user_id"] = user["id"]
        session["username"] = user["username"]
        return redirect(url_for("game"))
    return render_template("login.html", title="Player Login", form=form)


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


"""Decorator to quit or exit the game"""
@app.route("/quit", methods=["GET", "POST"])
def quit():
    session.clear()
    return redirect(url_for("index"))

@app.route("/help", methods=["GET", "POST"])
def help():
    return render_template("help.html")


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
