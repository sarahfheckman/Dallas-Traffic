import os
import pandas as pd

import sqlalchemy
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "super secret key"

from config import password
rds_connection_string = ("root:"+password+"@127.0.0.1:3306/dallastraffic")
engine = create_engine('mysql://'+rds_connection_string)

# rendering flask
@app.route("/")
def index():
    "return data for map"
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    name = request.form["userName"]
    email = request.form["userEmail"]
    phone = request.form["phone"]
    msg = request.form["msgBody"]
        
    engine.execute('INSERT INTO userdata (name, email, phone, msg) VALUES\
                         (%s, %s, %s, %s)', (name, email, phone, msg))
    flash('Thank you for your message! We will be in touch soon.')
    return redirect("/", code=302)
    

# jsonifying stuff
@app.route('/dallas_traffic')
def getdata():               
     final = pd.read_sql_query('select * from dallas_accidents', con=engine)                                 
     return final.to_json(orient='records')

# pulling data 
@app.route('/selection/<selection>')
def dataSelection(selection):
    """ pulling information for selected day """ 
    results = pd.read_sql_query("select * from dallas_accidents WHERE `Day of Week` = '%s'" %(selection), con=engine)
    return results.to_json(orient='records')



if __name__ == "__main__":
    app.run(debug=True)
