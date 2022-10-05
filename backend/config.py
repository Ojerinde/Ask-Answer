import os
SECRET_KEY = os.urandom(32)
# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))


# Connect to the database
database_path = 'postgresql://{}@{}/{}'.format(
    'postgres', 'localhost:5432', 'altschool')

# TODO IMPLEMENT DATABASE URL
SQLALCHEMY_DATABASE_URI = database_path
SQLALCHEMY_TRACK_MODIFICATIONS = False
