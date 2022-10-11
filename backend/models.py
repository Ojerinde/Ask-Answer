from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class FrontendQuestion(db.Model):
    __tablename__ = 'frontendQuestions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String,  nullable=False)
    images = db.Column(db.String)
    answered = db.Column(db.Boolean)
    comments = db.relationship('FrontendComment', backref="frontend", lazy=True, cascade="all, delete-orphan")
    

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
            'images': [] if len(self.images) == 0 else self.images.split(','),
        }

class FrontendComment(db.Model):
    __tablename__ = 'frontendComments'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('frontendQuestions.id'))
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



class BackendQuestion(db.Model):
    __tablename__ = 'backendQuestions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String,  nullable=False)
    images = db.Column(db.String)
    answered = db.Column(db.Boolean)
    comments = db.relationship('BackendComment', backref="backend", lazy=True, cascade="all, delete-orphan")
    

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
            'images': [] if len(self.images) == 0 else self.images.split(','),
        }

class BackendComment(db.Model):
    __tablename__ = 'backendComments'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('backendQuestions.id'))
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



class CloudQuestion(db.Model):
    __tablename__ = 'cloudQuestions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String,  nullable=False)
    images = db.Column(db.String)
    answered = db.Column(db.Boolean)
    comments = db.relationship('CloudComment', backref="cloud", lazy=True, cascade="all, delete-orphan")
    

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
            'images': [] if len(self.images) == 0 else self.images.split(','),
        }

class CloudComment(db.Model):
    __tablename__ = 'cloudComments'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('cloudQuestions.id'))
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
