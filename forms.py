from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.fields.core import SelectField
from wtforms.validators import InputRequired, EqualTo


""" User Registration Form """
class RegistrationForm(FlaskForm):        
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    password2 = PasswordField("Confirm Password", validators=[InputRequired(), EqualTo("password")])
    register = SubmitField("Register")


""" Login Form """
class LoginForm(FlaskForm):        
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    login = SubmitField("Login")


""" Game Form """
class GameForm(FlaskForm):
    # adjust the settings here
    
    submit = SubmitField("Play Game")