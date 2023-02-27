# import flask modules
from flask import Flask, redirect, render_template, request, url_for, session

from flask_session import Session

from flask_mysqldb import MySQL 

from database import *

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'your password'
app.config['MYSQL_DB'] = 'users'
 
mysql = MySQL(app)

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
"""
@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("login.html")
"""
# New code added in for Kieran to modify if necessary:

@app.route('/register', methods =['GET', 'POST'])
def register():
    msg = ''
    points = 0
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        password2 = request.form['password2']
        db = get_db()
        if db.execute("""SELECT * FROM users
                        WHERE username = ?;""", (username,)).fetchone() is not None:
            msg = 'Account already exists !'
        elif password != password2:
            msg = 'The passwords do not match !'
        elif not username or not password:
            msg = 'Please fill out the form !'
        else:
            db.execute("""INSERT INTO users (username, password) 
                            VALUES (?, ?);""", 
                            (username, password, points))
            db.commit()
            msg = 'You have successfully registered !'
    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('register.html', msg = msg)

""" Decorator for login """
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        # trying to see if user_id already exists in the database - there should be only one row
        user = db.execute("""SELECT * FROM users
                    WHERE username = ?;""", (username,)).fetchone()
        # if you are not in the database, you can't log in and error message given
        if user is None:
            form.username.errors.append("Oops!  Wrong Username")
        # check password matches - first get one from the database, then compare with what user has typed in.
        elif not check_password_hash(user["password"], password):
            form.password.errors.append("Incorrect password!")
        else:
            # create a session on login
            session.clear()
            #session["logged_in"] = True
            #if your username is in the dictionary
            session["username"] = username
            # then you are logged in
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("fairiesChase")
            # get taken back to the page that you are on
            return redirect(next_page)
    return render_template("login.html")


@app.route("/logout")
def logout():
    # empty the dictionary
    session.clear()
    return redirect(url_for("index"))



if __name__ == "__main__":
    app.run(debug=True)
