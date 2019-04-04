import os

import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import creat_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/popodb.sqlite"
db = SQLAlchemy(app)

base = automap_base()
base.prepare(db.engine, reflect=True)

#saving reference to sqlite table
data = base.classes.accidents


# rendering flask
@app.route("/")
def index():
    "return data for map"
    return render_template("index.html")

@app.route("/accidents")
def accidents(accident):
    "return list of accidents"
    
    # create dictionary entry for each row of data 
    

    # CANT OPEN THIS DB ON MY COMP / SEE COLUMN HEADERS 

    sel = [
        data.YearofIncident,
        data.Location1,
        data.ZipCode,
        data.Latitude,
        data.Longitude,
        data.DayofWeek,
        data.Coordinates
    ]

    results = db.session.query(*sel).filter(data.accidents == accidents).all()

    accidents = {}
    for result in results:
        data["Year of Indident"] = result[0]
        data["Location1"] = result[1]
        data["Zip Code"] = result[2]
        data["Latitude"] = result[3]
        data["Longitude"] = result[4]
        data["Day of Week"] = result[5]
        data["Coordinates"] = result[6]

    print(data)
    return jsonify(data)

if __name__ == "__main__":
    app.run()


