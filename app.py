import os
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import 

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# rendering flask
@app.route("/")s
def index():
    "return data for map"
    return render_template("index.html")

# jsonifying stuff
@app.route('/dallas_traffic')
def getdata():

    from config import password
    rds_connection_string = ("root:"+password+"@127.0.0.1:3306/dallastraffic")
    engine = create_engine('mysql://'+rds_connection_string)
        
    final = pd.read_sql_query('select * from dallas_accidents', con=engine)
           
    return final.to_json()

if __name__ == "__main__":
    app.run()