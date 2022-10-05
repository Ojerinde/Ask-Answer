import os
from flask import Flask, request, abort, jsonify
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, Question, Comment


app = Flask(__name__)
app.config.from_object('config')
db.init_app(app)
migrate = Migrate(app, db)

CORS(app, resources={"*": {"origins": "*"}})


@app.after_request
def after_request(response):
    response.headers.add("Allow-Control-Allow-Headers",
                         "Content-Type,Authorization,true")
    response.headers.add("Access-Control-Allow-Methods",
                         "GET,PATCH,POST,DELETE,OPTIONS")
    return response


@app.route('/')
def home():
    print('Okay')


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
