# import flask modules
from flask import Flask, redirect, render_template, request, url_for


app = Flask(__name__)
app.config["SECRET_KEY"] = "secretkeycs3305"


@app.route("/")     
def index():
    return render_template("index.html")


@app.route("/view", methods=["GET", "POST"])
def view():
    return render_template("view.html")



if __name__ == "__main__":
    app.run()
