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

@app.route("/")
def index():
    "return data for map"
    return render_template("index.html")

@app.route("/accidents")
def accidents():
    "get accident data to map"
    return

if __name__ == "__main__":
    app.run()


