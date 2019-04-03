import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/Traffic.sqlite"
db = SQLAlchemy(app)

#Base = automap_base()
#Base.prepare(db.engine, reflect=True)

#saving reference to sqlite table
#data = Base.classes.Dallas_Traffic

class userInput(db.Model):
    __tablename__ = 'userInput'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(64))
    phone = db.Column(db.Float)
    msg = db.Column(db.String(64))

    def __repr__(self):
        return '<userInput %r>' % (self.name)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/accidents")
def accidents():
    "get accident data to map"
    return jsonify(data)



@app.route("/send", methods=["POST"])
def send():
    name = request.form["userName"]
    email = request.form["userEmail"]
    phone = request.form["phone"]
    msg = request.form["msgBody"]

    uInput = userInput(name=name, email=email, phone=phone, msg=msg)
    db.session.add(uInput)
    db.session.commit()
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run()


