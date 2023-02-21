# import flask modules
from flask import Flask, redirect, render_template, request, url_for, session

from flask_session import Session

app = Flask(__name__)

app.config["SESSION_PERMAMENT"] = False

app.config["SESSION_TYPE"] = "filesystem"

Session(app)

app.config["SECRET_KEY"] = "secretkeycs3305"



Difficulty = 5

Sound = 5

Music = 5


@app.route("/")     
def index():
    return render_template("index.html")


@app.route("/game", methods=["GET", "POST"])
def game():
    return render_template("game.html")

@app.route("/settings", methods=["GET", "POST"])
def settings():

    if request.method == 'POST':
        if request.form.get('MinusDifficulty') == '-':
            Difficulty -=1

        elif request.form.get('IncreaseDifficulty') == '+':
            Difficulty +=1

    elif request.method == 'GET':
        return render_template("settings.html", Difficulty_Level = Difficulty, Sound = Sound , Music = Music, form = form)


    return render_template("settings.html", Difficulty_Level = Difficulty, Sound = Sound , Music = Music)


@app.route("/leaderboard", methods=["GET", "POST"])
def leaderboard():
    return render_template("leaderboard.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("login.html")

@app.route("/createAccount", methods=["GET", "POST"])
def createAccount():
    return render_template("createAccount.html")

# New code added in for Kieran to modify if necessary:

if __name__ == "__main__":
    app.run(debug=True)
