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
    return render_template("index.html", title="Game settings")

"""Decorator to play the game"""
@app.route("/game", methods=["GET", "POST"])
@login_required
def game():
    return render_template("game.html", title="Play the Game")

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


@app.route("/leaderboard", methods=["GET", "POST"])
@login_required
def leaderboard():
    form = GameForm()
    if form.validate_on_submit():
        db = get_db()
        db.execute("""INSERT INTO scores (username, score) VALUES (?, ?)""", (session["username"], 0))
        db.commit()
    return render_template("leaderboard.html", title="Leaderboard", form=form)

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

@app.route("/createAccount", methods=["GET", "POST"])
def createAccount():
    return render_template("createAccount.html")

# New code added in for Kieran to modify if necessary:

if __name__ == "__main__":
    app.run(debug=True)
