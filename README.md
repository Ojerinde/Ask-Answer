# ASK-ANSWER APP

## Introduction

ASK-ANSWER is built around a RESTful API which performs all CRUD operations. It is an app I am building to practice my Full Stack development skills. 

The App does the following by the help of the built API,
* Create question
* Answer a question
* Delete question


## Code Style
All backend code follows [PEP8 style guidelines](https://www.python.org/dev/peps/pep-0008/). 

## Main Files: Project Structure

```
├── README.md
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
└── backend
    ├── app.py  
    ├── models.py # Houses all the models
    ├── requirements.txt # The dependencies we need to install with `pip3 install -r requirements.txt`
    └── config.psql
```

**Overall**:

- Models are located in `models.py` file
- Controllers are located in `app.py` file
- COnfigurations are located in `config.py` file


## Getting Started

### Pre-requisites and Local Development 
The prerequites tools for local development are:

 - Python
 - Pip
 - Node
 - virtualenv: To create an isolated Python environment
 - Postgres
 


### Backend
It is a good practice to keep your app dependencies isolated by working a virtual environment.

* To Initialize a virtual enviroment, run

```
python -m virtualenv env
```

* To Activate the environment run

```
source env/bin/activate
```

**Note** - In Windows, the `env` does not have a `bin` directory. Therefore, you'd use the analogous command shown below:

```
source env/Scripts/activate
```

To run the backend application, you need to install the required packages by doing the following,

* navigate into the backend folder
* run 
  ```pip install -r requirements.txt```

After succesfull installation of the packages, you can get the app running by running the following commands

```
export FLASK_APP=myapp
export FLASK_DEBUG=True # enables debug mode
flask run

```
**Note**: For window, change export to set i.e. set FLASK_APP=myapp

The application is run on `http://127.0.0.1:5000/` by default and is a proxy in the frontend configuration. 

### Set up the Database

With Postgres running, in the app directory,

```
createbd altschool
```

Create the database table by running

```
flask db init # Initialize flask migrate script
flask db migrate # Create the tables
```
`flask db upgrade` # To add the changes to the database
`flask db downgrade` # To roll back the changes from the database


### Frontend
The app is built with React so there is need to install the frontend dependencies using Node.js and NPM

You can confirm if Node.js and NPM is installed successfully using the codes below

```
node -v
npm -v
```

From the frontend folder, run the following commands to start the client: 
```
npm install # run this once to install dependencies
npm start 
```

By default, the frontend will run on `localhost:3000`. 


## API Reference

### Getting Started

This application is not deployed and can only be run locally. The backend application is hosted at the default port (Base URL) which is set as a proxy in the frontend application.

* **Base URL**: http://127.0.0.1:5000/
* **Authentication**: This application doesn't require authentication or API keys.

### Error Handling

* **Errors format**: All errors are returned as a JSON object as shown below

```
{
    'success': False,
    'error': 404,
    'message': "Resources not found"
}
```

* **Error Codes and Messages**: The API will return one out of four(4) error type whenever the request fail:
    * 400: Bad request
    * 404: Resources not found
    * 405: Methods not allowed
    * 422: Request unprocessable

* **Error Mesaages possible solution**:
    * Bad Request: Check the format of your request. Make sure your format satisfies what the endpoint and the endpoint method requires.
    * Resources not found: Search for resources that exist in the database or server
    * Methods not allowed: Check if the method is allowed for the particular endpoint
    * Request unprocessable: Try again! Server error. 

### Endpoints

#### Method: GET
#### Endpoint: /frontend/all_questions
* General:
    * This endpoint fetches a dictionary of categories
    * Fetched results is an object with  `questions`, `total_questions`, and `answered_questions`.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/frontend/all_questions`
* Response: Json
```
{
    "answered_questions": 0,
    "questions": [],
    "total_questions": 0
}
```


#### Method: DELETE
#### Endpoint: /frontend/all_questions/{question_id}'
* General:
    * This endpoint deletes a question of the given question_id if it exists
    * Returned results is an object with with  `questions`, `total_questions`, and `answered_questions`.
    
* Sample:
    * Without argument: `curl -X DELETE http://127.0.0.1:5000//frontend/all_questions/1`
    * Response: json
```
{
    "answered_questions": 0,
    "questions": [],
    "total_questions": 0
}
```
