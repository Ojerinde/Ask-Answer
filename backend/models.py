from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String,  nullable=False)
    images = db.Column(db.String)
    answered = db.Column(db.Boolean)
    comments = db.relationship('Comment', backref="venue", lazy=True, cascade="all, delete-orphan")
    

    def __init__(self, title, description, images):
        self.title = title
        self.description = description
        self.images = images
        self.answered = False

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'images': self.images.split(','),
        }

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    name = db.Column(db.String, nullable=False)
    answer = db.Column(db.String(1000), nullable=False)
    date = db.Column(db.DateTime)

    def __init__(self, question_id, name, answer):
        self.question_id = question_id
        self.name = name
        self.answer = answer
        self.date = datetime.now()

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'name': self.name,
            'answer': self.answer,
            'date': self.date
        }
