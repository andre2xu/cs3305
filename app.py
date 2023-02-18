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
    return render_template("settings.html", Difficulty_Level = Difficulty, Sound = Sound , Music = Music)

def Add_Difficulty():
    Difficulty += 1
    return render_template("settings.html", Difficulty_Level = Difficulty, Sound = Sound , Music = Music)

def Minus_Difficulty():
    Difficulty -= 1
    return render_template("settings.html", Difficulty_Level = Difficulty, Sound = Sound , Music = Music)

# New code added in for Kieran to modify if necessary:

""" Decorator for user registration """
@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        password2 = form.password2.data
        # Remember - Passwords are stored in the database as plain text
        db = get_db()
        # Extra if statement required to check for duplicate username
        if db.execute("""SELECT * FROM users
                        WHERE username = ?;""", (username,)).fetchone() is not None:
            form.username.errors.append("Username already exists. Please choose another Username.")
        # If statement required to check if the passwords do match.
        elif not password2 == password:
            form.password2.errors.append("Passwords do not match.  Try again.")
        else:
            db.execute("""INSERT INTO users (username, password)
                            VALUES (?, ?);""", 
                            (username, generate_password_hash(password)))
            db.commit()
        #Redirect you to login route
        return redirect(url_for("login"))
    return render_template("register.html", title="Become a member", form=form)



""" Decorator for login """
@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
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
    return render_template("login.html", title="User Login", form=form)



""" Decorator for logout """
# Logout route
@app.route("/logout")
def logout():
    # empty the dictionary
    session.clear()
    return redirect(url_for("index"))



"""Decorator for a contact form"""
@app.route("/contactus", methods=["GET", "POST"])
def contactus():
    form = ContactUsForm()
    submitmessage = ""
    if form.validate_on_submit():
        firstname = form.firstname.data
        lastname = form.lastname.data
        email = form.email.data
        message = form.message.data
        if firstname is None:
            form.firstname.errors.append("This field is required.")
        elif lastname is None:
            form.lastname.errors.append("This field is required.")    
        elif email is None:
            form.email.errors.append("Please type in a valid e-mail address")      
        elif message is None:
            form.message.errors.append("This field cannot be blank.")           
        submitmessage = "Your message has been successfully sent"
    return render_template("contactus.html", title="Contact Us", form=form, submitmessage=submitmessage)



""" Decorator to store the score """
@app.route("/store_score", methods=["POST"])
@login_required
def store_score():
    score = int(request.form["score"])
    # used similar code as score above to be passed to the level variable.
    level = request.form["level"]   
    db = get_db()
    username = g.user
    # additional validators
    if score <= 0:
        return "Score is below zero."
    # Here insert the score into the database
    else:
        db.execute("""INSERT INTO scoreboard (username, level, score) VALUES (?, ?, ?);""", (username, level, score))
        db.commit()
        # if update is successful return success, otherwise return failure
    return "success"



"""Decorator to view the scoreboard"""
@app.route("/scoreboard")
@login_required
def scoreboard():
    db = get_db()
    details = db.execute("""SELECT * FROM scoreboard ORDER BY level, score DESC;""").fetchall()
    details = list(details)
    #print (details)
    scores = []
    #for row in details:
    for row in details:
        row = [item for item in row]
        scores.append(row)
        #print (scores)
    return render_template("scoreboard.html", title="Scoreboard", scores=scores)




if __name__ == "__main__":
    app.run(debug=True)
