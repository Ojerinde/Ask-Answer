# ASK-ANSWER APP

![image](https://user-images.githubusercontent.com/104495751/195710716-47c25b06-cbe6-4afc-a6c3-50c349c493ac.png)

![image](https://user-images.githubusercontent.com/104495751/195710582-8f05fadc-0ca1-4b33-a3ca-3a1e66a719d5.png)

## Introduction

ASK-ANSWER is an application where student get to ask question and their tutor get to answer it. The app API is built around a RESTful concepts and it performs all CRUD operations. It is an app I am building to practice my Full Stack development skills. 

The App does the following by the help of the built API,
* Create question
* Answer a question
* Delete question
* Answer question

## Authentication
The application make us of Google authenticator to verify users.

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

With Postgres running, create a database using the command below,

```
createbd altschool
```

Create the database tables by running

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
#### Endpoint: /<track>/all_questions
* General:
    * This endpoint fetches all unanswered questions question
    * Fetched results is an object with  `questions`, `total_questions`, and `answered_questions` keys.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/all_questions`
* Response: Json
```
{
    "answered_questions": 1,
    "questions": [
        {
            "description": "How do I select an Html element",
            "id": 3,
            "images": [],
            "title": "Js"
        },
        {
            "description": "What is the selector for class",
            "id": 2,
            "images": [],
            "title": "Css"
        },
        {
            "description": "is <a> an inline or block element.",
            "id": 1,
            "images": [],
            "title": "Html"
        }
    ],
    "total_questions": 3
}
```

#### Method: POST
#### Endpoint: /<track>/add_questions
* General:
    * This endpoint create a question
    * Fetched results is an object with  `questions`, `total_questions`, and `answered_questions` keys.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/add_question -H "Content-Type: application/json" -d '{"title": "Invalid commands", "question": "I am having an error when I run npm run"}'`

* Request: Json
```
{
    "title": "Invalid commands",
    "question": "I am having an error when I run npm run",
    "images": [] # This is optional
}
```

* Response: Json
```
{
    "success": true
}
```

#### Method: GET
#### Endpoint: /<track>/all_questions/{question_id}
* General:
    * This endpoint fetches an unanswered question based on the given question id
    * Fetched results is an object with  `question` key.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/all_questions/1`
* Response: Json
```
{
    "question": {
        "description": "is <a> an inline or block element.",
        "id": 1,
        "images": [],
        "title": "Html"
    }
}
```

#### Method: PATCH
#### Endpoint: /<track>/all_questions/{question_id}
* General:
    * This endpoint modified the answered column of a question from false to true i.e., a question has been answered 
    * Fetched results is an object with  `questions`, `total_questions`, and `answered_questions` keys.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/all_questions/1`
* Response: Json
```
{
    "answered_questions": 2,
    "questions": [
        {
            "description": "I am having an error when I run npm run",
            "id": 5,
            "images": [],
            "title": "Invalid commands"
        },
        {
            "description": "How do I select an Html element",
            "id": 3,
            "images": [],
            "title": "Js"
        },
        {
            "description": "What is the selector for class",
            "id": 2,
            "images": [],
            "title": "Css"
        }
    ],
    "total_questions": 3
}
```

#### Method: GET
#### Endpoint: /<track>/answered_questions
* General:
    * This endpoint fetches all the answered questions 
    * Fetched results is an object with  `questions`, and `total_questions` keys.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/answered_questions`
* Response: Json
```
{
    "questions": [
        {
            "description": "How do I start a React app",
            "id": 4,
            "images": [],
            "title": "React"
        },
        {
            "description": "is <a> an inline or block element.",
            "id": 1,
            "images": [],
            "title": "Html"
        }
    ],
    "total_questions": 2
}
```

#### Method: GET
#### Endpoint: /<track>/answered_questions/{question_id}
* General:
    * This endpoint fetches an answered question based on the given id
    * Fetched results is an object with  `question` key.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/answered_questions/1`
* Response: Json
```
{
    "question": {
        "description": "is <a> an inline or block element.",
        "id": 1,
        "images": [],
        "title": "Html"
    }
}
```

#### Method: POST
#### Endpoint: /<track>/all_questions
* General:
    * This endpoint filter questions based on the given title and it is case insensitive.
    * Fetched results is an object with  `questions`, `total_questions`, and `answered_questions` keys.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/all_question -H "Content-Type: application/json" -d '{"title": "Invalid commands", "offset": 0, "limit: 3}'`

* Request: Json
```
{
    "title": "Invalid",
    "offset": 0,
    "limit": 3
}
```

* Response: Json
```
{
    "answered_questions": 0,
    "questions": [
        {
            "description": "I am having an error when I run npm run",
            "id": 5,
            "images": [],
            "title": "Invalid commands"
        }
    ],
    "total_questions": 1
}
```

#### Method: DELETE
#### Endpoint: /<track>/all_questions/{question_id}'
* General:
    * This endpoint deletes a question of the given question_id if it exists
    * Returned results is an object with with  `questions`, `total_questions`, and `answered_questions`.
    
* Sample:
    * Without argument: `curl -X DELETE http://127.0.0.1:5000/frontend/all_questions/1`

* Response: json
```
{
    "answered_questions": 1,
    "questions": [
        {
            "description": "I am having an error when I run npm run",
            "id": 5,
            "images": [],
            "title": "Invalid commands"
        },
        {
            "description": "How do I select an Html element",
            "id": 3,
            "images": [],
            "title": "Js"
        },
        {
            "description": "What is the selector for class",
            "id": 2,
            "images": [],
            "title": "Css"
        }
    ],
    "total_questions": 3
}
```

#### Method: POST
#### Endpoint: /<track>/all_questions/{question_id}/comments
* General:
    * This endpoint create comment for a given question
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/all_question/2/comments -H "Content-Type: application/json" -d '{"name": "Joel", "answer": "The selector for class is '.' without the quote"}'`

* Request: Json
```
{
    "name": "Joel",
    "answer": "The selector for class is '.' without the quote"
}
```

* Response: Json
```
{
    "success": true
}
```

#### Method: GET
#### Endpoint: /<track>/answered_questions/{question_id}/comments
* General:
    * This endpoint fetches all comments of a given id.
    * Fetched results is an object with  `comments` and `total_comments` keys.
    * Request argument: None 
* Sample:
    * Without argument: `curl http://127.0.0.1:5000/<track>/answered_questions/2/comments`
* Response: Json
```
{
    "comments": [
        {
            "answer": "The selector for class is '.' without the quote",
            "date": "Thu, 13 Oct 2022 13:30:03 GMT",
            "id": 4,
            "name": "Joel",
            "question_id": 2
        }
    ],
    "total_comments": 1
}
```

## Deployment
The app is not deployed

## Author
Joel Ojerinde

## Acknowledgements 
Udacity and AltSchool Africa
