import os
from turtle import title
from flask import Flask, request, abort, jsonify
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, FrontendQuestion, BackendQuestion, CloudQuestion, FrontendComment, BackendComment, CloudComment

# Instantiate flask app
app = Flask(__name__)

# Get configuration from config.py
app.config.from_object('config')

# Initialize SQALchemy and Migrate
db.init_app(app)
migrate = Migrate(app, db)

# Set Cors for all resources and all origins
CORS(app, resources={"*": {"origins": "*"}})

# Add Request methods
@app.after_request
def after_request(response):
    response.headers.add("Allow-Control-Allow-Headers",
                         "Content-Type,Authorization,true")
    response.headers.add("Access-Control-Allow-Methods",
                         "GET,PATCH,POST,PUT,DELETE,OPTIONS")
    return response

# A function to seperate answered questions from unanswered questions
def type_check(query, bool_type):
    questions = []
    for ques in query:
        if ques.answered != bool_type:
            continue
        questions.append(ques.format())
    return questions


###############################################################################################################
################################################ FRONTEND #####################################################
# Get all questios route
@app.route('/frontend/all_questions')
def get_questions():
    query = FrontendQuestion.query.order_by(FrontendQuestion.id.desc()).all()

    # Getting answered questions
    questions = type_check(query, False)

    # Getting unanswered questions
    answered_questions = type_check(query, True)

    return jsonify({
        'questions': questions,
        'total_questions': len(questions),
        "answered_questions": len(answered_questions)

    })


# Add a question route
@app.route('/frontend/add_question', methods=["POST"])
def create_question():
    body = request.get_json()

    # Getting request body
    title = body.get('title', None)
    question = body.get('question', None)
    images_list = body.get('images', None)

    # Run the following if only there is a list of image
    images = ''
    if images_list:
        images = ",".join(images_list)

    try:
        # Checking if required fields are filled
        if not (title or question):
            abort(400)

        # Creating a new question
        question = FrontendQuestion(title=title, description=question, images=images)
        question.insert()

    except:
        abort(400)

    return jsonify({
        'success': True,
    })

# Get a question details route
@app.route('/frontend/all_questions/<int:question_id>')
def get_question(question_id):
    query = FrontendQuestion.query.get(question_id)

    try:
        if not query:
            abort(404)

        return jsonify({
            'question': query.format(),
        })
    except:
        abort(404)


# Answers question
@app.route('/frontend/all_questions/<int:question_id>', methods=["PATCH"])
def move_question_to_answered_page(question_id):

    query = FrontendQuestion.query.get(question_id)

    try:
        if not query:
            abort(404)

        query.answered = True
        query.update()

        new_query = FrontendQuestion.query.order_by(FrontendQuestion.id.desc()).all()

        if len(new_query) == 0:
            abort(404)

        questions = type_check(new_query, False)
        answered_questions = type_check(new_query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(404)

# Get answered questions
@app.route('/frontend/answered_questions')
def get_answered_questions():
    query = FrontendQuestion.query.order_by(FrontendQuestion.id.desc()).all()

    try:
       
        questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
        })
    except:
        abort(404)

# Get answered question details
@app.route('/frontend/answered_questions/<int:id>')
def get_answered_question(id):
    query = FrontendQuestion.query.get(id)

    try:
        if not query:
            abort(404)

        return jsonify({
            'question': query.format(),
        })
    except:
        abort(404)


# Filter question
@app.route('/frontend/all_questions', methods=["POST"])
def filter_questions():
    body = request.get_json()

    title = body.get('title', None)
    offset = body.get('offset', None)
    limit = body.get('limit', None)

    try:
        if not (title or offset or limit):
            abort(400)

        query = FrontendQuestion.query.filter(FrontendQuestion.title.ilike(f'%{title}%')).limit(limit).offset(offset).all()

        questions = type_check(query, False)
        answered_questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(400)


# Delete
@app.route('/frontend/all_questions/<int:id>',methods=["DELETE"])
def delete_question(id):
    query = FrontendQuestion.query.get(id)
    print(query)
    try:
        if not query:
            abort(404)
        
        query.delete()

        query = FrontendQuestion.query.order_by(FrontendQuestion.id.desc()).all()

        questions = type_check(query, False)
        answered_questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(404)


# Add comment
@app.route('/frontend/all_questions/<int:question_id>/comments', methods=["POST"])
def create_comment(question_id):
    body = request.get_json()

    name = body.get('name', None)
    answer = body.get('answer', None)

    try:
        if not (name or answer):
            abort(400)

        comment = FrontendComment(name=name, answer=answer, question_id=question_id)
        comment.insert()

    except:
        abort(400)

    return jsonify({
        'success': True,
    })


# Get a question comments 
@app.route('/frontend/answered_questions/comments/<int:id>')
def get_comments(id):
    query = FrontendComment.query.filter_by(question_id=id).all()
    print(query)

    # Getting answered questions
    comments = [comment.format() for comment in query]

    return jsonify({
        'comments': comments,
        'total_comments': len(comments),
    })




###############################################################################################################
################################################ BACKEND ######################################################
# Get all questios route
@app.route('/backend/all_questions')
def get_backend_questions():
    query = BackendQuestion.query.order_by(BackendQuestion.id.desc()).all()

    # Getting answered questions
    questions = type_check(query, False)

    # Getting unanswered questions
    answered_questions = type_check(query, True)

    return jsonify({
        'questions': questions,
        'total_questions': len(questions),
        "answered_questions": len(answered_questions)

    })


# Add a question route
@app.route('/backend/add_question', methods=["POST"])
def create_backend_question():
    body = request.get_json()

    # Getting request body
    title = body.get('title', None)
    question = body.get('question', None)
    images_list = body.get('images', None)

    # Run the following if only there is a list of image
    images = ''
    if images_list:
        images = ",".join(images_list)

    try:
        # Checking if required fields are filled
        if not (title or question):
            abort(400)

        # Creating a new question
        question = BackendQuestion(title=title, description=question, images=images)
        question.insert()

    except:
        abort(400)

    return jsonify({
        'success': True,
    })

# Get a question details route
@app.route('/backend/all_questions/<int:question_id>')
def get_backend_question(question_id):
    query = BackendQuestion.query.get(question_id)

    try:
        if not query:
            abort(404)

        return jsonify({
            'question': query.format(),
        })
    except:
        abort(404)


# Answers question
@app.route('/backend/all_questions/<int:question_id>', methods=["PATCH"])
def move_backend_question(question_id):

    query = BackendQuestion.query.get(question_id)

    try:
        if not query:
            abort(404)

        query.answered = True
        query.update()

        new_query = BackendQuestion.query.order_by(BackendQuestion.id.desc()).all()

        if len(new_query) == 0:
            abort(404)

        questions = type_check(new_query, False)
        answered_questions = type_check(new_query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(404)

# Get answered questions
@app.route('/backend/answered_questions')
def get_backend_answered_questions():
    query = BackendQuestion.query.order_by(BackendQuestion.id.desc()).all()

    try:
        if not query:
            abort(404)

        questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
        })
    except:
        abort(404)

# Get answered question details
@app.route('/backend/answered_questions/<int:id>')
def get_backend_answered_question(id):
    query = BackendQuestion.query.get(id)

    try:

        return jsonify({
            'question': query.format(),
        })
    except:
        abort(404)


# Filter question
@app.route('/backend/all_questions', methods=["POST"])
def filter_backend_questions():
    body = request.get_json()

    title = body.get('title', None)
    offset = body.get('offset', None)
    limit = body.get('limit', None)

    try:
        if not (title or offset or limit):
            abort(400)

        query = BackendQuestion.query.filter(BackendQuestion.title.ilike(f'%{title}%')).limit(limit).offset(offset).all()

        questions = type_check(query, False)
        answered_questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(400)


# Delete
@app.route('/backend/all_questions/<int:id>', methods=["DELETE"])
def delete_backend_question(id):
    query = BackendQuestion.query.get(id)
    print(query)
    try:
        if not query:
            abort(404)
        
        query.delete()

        query = BackendQuestion.query.order_by(BackendQuestion.id.desc()).all()

        questions = type_check(query, False)
        answered_questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(404)


# Add comment
@app.route('/backend/all_questions/<int:question_id>/comments', methods=["POST"])
def create_backend_comment(question_id):
    body = request.get_json()

    name = body.get('name', None)
    answer = body.get('answer', None)

    try:
        if not (name or answer):
            abort(400)

        comment = BackendComment(name=name, answer=answer, question_id=question_id)
        comment.insert()

    except:
        abort(400)

    return jsonify({
        'success': True,
    })


# Get a question comments 
@app.route('/backend/answered_questions/comments/<int:id>')
def get_backend_comments(id):
    query = BackendComment.query.filter_by(question_id=id).all()

    # Getting answered questions
    comments = [comment.format() for comment in query]

    return jsonify({
        'comments': comments,
        'total_comments': len(comments),
    })



###############################################################################################################
################################################ CLOUD ######################################################
# Get all questios route
@app.route('/cloud/all_questions')
def get_cloud_questions():
    query = CloudQuestion.query.order_by(CloudQuestion.id.desc()).all()

    # Getting answered questions
    questions = type_check(query, False)

    # Getting unanswered questions
    answered_questions = type_check(query, True)

    return jsonify({
        'questions': questions,
        'total_questions': len(questions),
        "answered_questions": len(answered_questions)

    })


# Add a question route
@app.route('/cloud/add_question', methods=["POST"])
def create_cloud_question():
    body = request.get_json()

    # Getting request body
    title = body.get('title', None)
    question = body.get('question', None)
    images_list = body.get('images', None)
   
    try:
        # Checking if required fields are filled
        if not (title or question):
            abort(400)

        # Creating a new question
        question = CloudQuestion(title=title, description=question, images=",".join(images_list))
        question.insert()

    except:
        abort(400)

    return jsonify({
        'success': True,
    })

# Get a question details route
@app.route('/cloud/all_questions/<int:question_id>')
def get_cloud_question(question_id):
    query = CloudQuestion.query.get(question_id)

    try:
        if not query:
            abort(404)

        return jsonify({
            'question': query.format(),
        })
    except:
        abort(404)


# Answers question
@app.route('/cloud/all_questions/<int:question_id>', methods=["PATCH"])
def move_cloud_question(question_id):

    query = CloudQuestion.query.get(question_id)

    try:
        if not query:
            abort(404)

        query.answered = True
        query.update()

        new_query = CloudQuestion.query.order_by(CloudQuestion.id.desc()).all()

        if len(new_query) == 0:
            abort(404)

        questions = type_check(new_query, False)
        answered_questions = type_check(new_query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(404)

# Get answered questions
@app.route('/cloud/answered_questions')
def get_cloud_answered_questions():
    query = CloudQuestion.query.order_by(CloudQuestion.id.desc()).all()

    try:
       
        questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
        })
    except:
        abort(404)

# Get answered question details
@app.route('/cloud/answered_questions/<int:id>')
def get_cloud_answered_question(id):
    query = CloudQuestion.query.get(id)

    try:
        if not query:
            abort(404)

        return jsonify({
            'question': query.format(),
        })
    except:
        abort(404)


# Filter question
@app.route('/cloud/all_questions', methods=["POST"])
def filter_cloud_questions():
    body = request.get_json()

    title = body.get('title', None)
    offset = body.get('offset', None)
    limit = body.get('limit', None)

    try:
        if not (title or offset or limit):
            abort(400)

        query = CloudQuestion.query.filter(CloudQuestion.title.ilike(f'%{title}%')).limit(limit).offset(offset).all()

        questions = type_check(query, False)
        answered_questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(400)


# Delete
@app.route('/cloud/all_questions/<int:id>', methods=["DELETE"])
def delete_cloud_question(id):
    query = CloudQuestion.query.get(id)
    try:
        if not query:
            abort(404)
        
        query.delete()

        query = CloudQuestion.query.order_by(CloudQuestion.id.desc()).all()

        questions = type_check(query, False)
        answered_questions = type_check(query, True)

        return jsonify({
            'questions': questions,
            'total_questions': len(questions),
            "answered_questions": len(answered_questions)
        })

    except:
        abort(404)



# Add comment
@app.route('/cloud/all_questions/<int:question_id>/comments', methods=["POST"])
def create_cloud_comment(question_id):
    body = request.get_json()

    name = body.get('name', None)
    answer = body.get('answer', None)

    try:
        if not (name or answer):
            abort(400)

        comment = CloudComment(name=name, answer=answer, question_id=question_id)
        comment.insert()

    except:
        abort(400)

    return jsonify({
        'success': True,
    })


# Get a question comments 
@app.route('/cloud/answered_questions/comments/<int:id>')
def get_cloud_comments(id):
    query = CloudComment.query.filter_by(question_id=id).all()

    # Getting answered questions
    comments = [comment.format() for comment in query]

    return jsonify({
        'comments': comments,
        'total_comments': len(comments),
    })



@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 404,
        'message': "Resources not found"
    }), 404


@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
        'success': False,
        'error': 422,
        'message': "Request unprocessable"
    }), 422


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        'success': False,
        'error': 400,
        'message': "Bad Request"
    }), 400


@app.errorhandler(405)
def false_methods(error):
    return jsonify({
        'success': False,
        'error': 405,
        'message': "Methods not allowed"
    }), 405


@app.errorhandler(500)
def false_methods(error):
    return jsonify({
        'success': False,
        'error': 500,
        'message': "Server error"
    }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
