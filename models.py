from app import db


class userInput(db.Model):
    __tablename__ = 'userInput'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(64))
    phone = db.Column(db.Float)
    msg = db.Column(db.String(64))

    def __repr__(self):
        return '<userInput %r>' % (self.name)
