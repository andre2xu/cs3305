from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, EqualTo


""" User Registration Form """
class RegistrationForm(FlaskForm):        
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    password2 = PasswordField("Re-enter", validators=[InputRequired(), EqualTo("password")])
    register = SubmitField("Register")


""" Login Form """
class LoginForm(FlaskForm):        
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    login = SubmitField("Login")


""" Start Game Form """
class StartGameForm(FlaskForm):   
    start = SubmitField("Start Game")

