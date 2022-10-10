import json
import pytest

from app import app


@pytest.fixture
def client():
    client = app.test_client()

    yield client


# def test_get_questions_pass(client):
#     response = client.get('/frontend/all_questions')
#     response_data = json.loads(response.data)

#     assert response.status_code == 200
#     assert response_data['questions']
#     assert response_data['total_questions']
#     assert response_data['answered_questions']

# def test_get_questions_fail(client):
#     response = client.get('/frontend/all_questions')

#     assert response.status_code == 404


# def test_post_question_pass(client):
#     body = {'title': "Joel",
#             'question': "Are you sure?"}
#     response = client.post('/frontend/add_question',
#                            data=json.dumps(body), content_type='application/json')
#     response_data = json.loads(response.data)

#     assert response.status_code == 200
#     assert response_data['success'] == True

# def test_post_question_fail(client):
#     response = client.post('/frontend/add_question')
#     response_data = json.loads(response.data)

#     assert response.status_code == 400
#     assert response_data['success'] == False
#     assert response_data['message'] == "Bad Request"


# def test_patch_question_pass(client):
#     response = client.patch('/frontend/all_questions/1')
#     response_data = json.loads(response.data)

#     assert response.status_code == 200
#     assert response_data['questions']
#     assert response_data['total_questions']
#     assert response_data['answered_questions']

# def test_patch_question_fail(client):
#     response = client.patch('/frontend/all_questions/100')
#     response_data = json.loads(response.data)

#     assert response.status_code == 404
#     assert response_data['success'] == False
#     assert response_data['message'] == "Resources not found"


# def test_get_answered_questions_pass(client):
#     response = client.get('/frontend/answered_questions')
#     response_data = json.loads(response.data)

#     assert response.status_code == 200
#     assert response_data['questions']
#     assert response_data['total_questions']

# def test_get_answered_questions_fail(client):
#     response = client.get('/frontend/answered_questions')
#     response_data = json.loads(response.data)

#     assert response.status_code == 404
#     assert response_data['success'] == False
#     assert response_data['message'] == "Resources not found"


# def test_get_answered_question_pass(client):
#     response = client.get('/frontend/answered_questions/1')
#     response_data = json.loads(response.data)

#     assert response.status_code == 200
#     assert response_data['question']

# def test_get_answered_question_fail(client):
#     response = client.get('/frontend/answered_questions/100')
#     response_data = json.loads(response.data)

#     assert response.status_code == 404
#     assert response_data['success'] == False
#     assert response_data['message'] == "Resources not found"


# def test_search_questions_pass(client):
#     body = {"title": "o", "offset": 0, "limit": 5}
#     response = client.post('/frontend/all_questions',
#                            data=json.dumps(body), content_type="application/json ")
#     response_data = json.loads(response.data)

#     assert response.status_code == 200
#     assert response_data['questions']
#     assert response_data['total_questions']
#     assert response_data['answered_questions']

# def test_search_questions_fail(client):
#     response = client.post('/frontend/all_questions'
#                            )
#     response_data = json.loads(response.data)

#     assert response.status_code == 400
#     assert response_data['success'] == False


# def test_delete_question_pass(client):
#     response = client.delete('/frontend/all_questions/2')
#     response_data = json.loads(response.data)

#     assert response.status_code == 200
#     assert response_data['questions']
#     assert response_data['total_questions']
#     assert response_data['answered_questions']

# def test_delete_question_fail(client):
#     response = client.delete('/frontend/all_questions/100')
#     response_data = json.loads(response.data)

#     assert response.status_code == 404
#     assert response_data['success'] == False


# def test_get_comments_pass(client):
#     response = client.get('/frontend/answered_questions/comments/1')
#     response_data = json.loads(response.data)
#     print(response_data)

#     assert response.status_code == 200
#     assert response_data['comments']
#     assert response_data['total_comments']

# def test_get_comments_fail(client):
#     response = client.get('/frontend/answered_questions/comments/100')
#     response_data = json.loads(response.data)

#     assert response.status_code == 404
#     assert response_data['success'] == False
#     assert response_data['message'] == "Resources not found"


# def test_post_comment_pass(client):
#     body = {'name': "Joel",
#             'answer': "Are you sure?"}
#     response = client.post('/frontend/all_questions/1/comments',
#                            data=json.dumps(body), content_type='application/json')
#     response_data = json.loads(response.data)

#     assert response.status_code == 200
#     assert response_data['success'] == True

# def test_post_comment_fail(client):
#     response = client.post('/frontend/all_questions/100/comments')
#     response_data = json.loads(response.data)

#     assert response.status_code == 400
#     assert response_data['success'] == False
#     assert response_data['message'] == "Bad Request"
