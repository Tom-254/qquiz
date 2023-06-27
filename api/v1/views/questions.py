import math
from flask import request, jsonify, abort
from sqlalchemy.orm import make_transient
import models

from models.choice import Choice
from models.user import User
from api.v1.views import app_views
from api.v1.questions.questions import Questions


question_controllers = Questions()


# Category CRUD
@app_views.route('/category', methods=['POST'], strict_slashes=False)
def create_category():
    request_data = None
    try:
        request_data = request.get_json()
    except Exception as e:
        abort(400, description="Invalid JSON formart.")

    if "name" not in request_data:
        abort(400)

    return jsonify(question_controllers.create_category(
        request_data.get("name")).to_json())


@app_views.route('/category', methods=['GET'])
def read_categories():
    return jsonify(question_controllers.read_categories())


@app_views.route('/category/<category_id>', methods=['GET'])
def read_category(category_id: str):
    if category_id is None:
        abort(404)

    return jsonify(question_controllers.read_category(category_id).to_json())


@app_views.route('/category/<category_id>', methods=['PUT'])
def update_category(category_id: str):
    pass


@app_views.route('/category/<category_id>', methods=['DELETE'])
def delete_category(category_id: str):
    pass


# Quiz General Details CRUD

@app_views.route('/quiz_general_detail', methods=['POST'])
def create_quiz_general_detail():
    request_data = None
    try:
        request_data = request.get_json()
    except Exception as e:
        abort(400, "Invalid JSON formart.")

    for field in ["title", "category_id", "description", "user_id", "visibility"]:
        if field not in request_data:
            abort(400, f"{field} is required")

    return jsonify(question_controllers.create_quiz_general_detail(
        request_data).to_json())


@app_views.route('/quiz_general_detail/<detail_id>', methods=['GET'])
def read_quiz_general_detail(detail_id: str):
    if detail_id is None:
        abort(404)

    return jsonify(question_controllers.read_quiz_general_detail(detail_id).to_json())


@app_views.route('/public_quiz_groups/', methods=['GET'])
def read_public_quiz_groups():

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    if page is None or per_page is None:
        abort(400, "Missing required arguments")

    quizes = question_controllers.read_public_quiz_groups(page, per_page)

    data, total = quizes.values()

    result = []
    for general_detail in data:
        result.append({
            'general_detail': {
                'id': general_detail.id,
                'title': general_detail.title,
                'category_id': general_detail.category_id,
                'user_id': general_detail.user_id,
                'description': general_detail.description
            },
            'questions': [{
                'id': question.id,
                'question': question.question,
                'answer_type': question.answer_type,
                'choices': [{
                    'id': choice.id,
                    'name': choice.name,
                    'is_correct': choice.is_correct
                } for choice in question.choices]
            } for question in general_detail.questions]
        })

    return jsonify({
        'data': result,
        'total': total,
        'pages': math.ceil(total / per_page),
        'prev_num': page - 1 if page > 1 else None,
        'next_num': page + 1 if page * per_page < total else None
    })


@app_views.route('/user_quiz_groups/', methods=['GET'])
def read_user_quiz_groups():

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    if page is None or per_page is None:
        abort(400, "Missing required arguments")

    quizes = question_controllers.read_user_quiz_groups(
        page, per_page, request.current_user.id)

    data, total = quizes.values()

    result = []
    for general_detail in data:
        result.append({
            'general_detail': {
                'id': general_detail.id,
                'title': general_detail.title,
                'category_id': general_detail.category_id,
                'user_id': general_detail.user_id,
                'description': general_detail.description
            },
            'questions': [{
                'id': question.id,
                'question': question.question,
                'answer_type': question.answer_type,
                'choices': [{
                    'id': choice.id,
                    'name': choice.name,
                    'is_correct': choice.is_correct
                } for choice in question.choices]
            } for question in general_detail.questions]
        })

    return jsonify({
        'data': result,
        'total': total,
        'pages': math.ceil(total / per_page),
        'prev_num': page - 1 if page > 1 else None,
        'next_num': page + 1 if page * per_page < total else None
    })


@app_views.route('/create_quiz_group/', methods=['POST'])
def create_quiz_group():
    request_data = None
    try:
        request_data = request.get_json()
    except Exception as e:
        abort(400, "Invalid JSON formart.")

    for field in ["general_detail", "questions"]:
        if field not in request_data:
            abort(400, f"{field} is required")

    # Check if all required fields are present in general_detail
    for field in ["title", "category_id", "user_id", "description", "visibility"]:
        if field not in request_data['general_detail']:
            abort(400, f"{field} is required in general_detail")

    for question_data in request_data['questions']:
        # Check if all required fields are present in question
        for field in ["question", "answer_type", "choices"]:
            if field not in question_data:
                abort(400, f"{field} is required in question")

    general_detail = question_controllers.create_quiz_group(request_data)

    return jsonify({
        'data': {
            'general_detail': {
                'id': general_detail.id,
                'title': general_detail.title,
                'category_id': general_detail.category_id,
                'user_id': general_detail.user_id,
                'description': general_detail.description
            },
            'questions': [{
                'id': question.id,
                'question': question.question,
                'answer_type': question.answer_type,
                'choices': [{
                    'id': choice.id,
                    'name': choice.name,
                    'is_correct': choice.is_correct
                } for choice in question.choices]
            } for question in general_detail.questions]
        },
    })


@app_views.route('/update_quiz_group/<general_detail_id>', methods=['PUT'])
def update_quiz_group(general_detail_id):

    if general_detail_id is None:
        abort(404)

    request_data = None
    try:
        request_data = request.get_json()
    except Exception as e:
        abort(400, "Invalid JSON formart.")

    general_detail = question_controllers.update_quiz_group(
        general_detail_id, request_data)

    if not general_detail:
        abort(404)

    return jsonify({
        'data': {
            'general_detail': {
                'id': general_detail.id,
                'title': general_detail.title,
                'category_id': general_detail.category_id,
                'user_id': general_detail.user_id,
                'description': general_detail.description
            },
            'questions': [{
                'id': question.id,
                'question': question.question,
                'answer_type': question.answer_type,
                'choices': [{
                    'id': choice.id,
                    'name': choice.name,
                    'is_correct': choice.is_correct
                } for choice in question.choices]
            } for question in general_detail.questions]
        },
    })


@app_views.route('/delete_quiz_group/<general_detail_id>', methods=['DELETE'])
def delete_quiz_group(general_detail_id):
    if general_detail_id is None:
        abort(404)

    if question_controllers.delete_quiz_group(general_detail_id):
        return jsonify({"success": "Deleted Successfully"})
    return jsonify({"error": "Details not found"})


@app_views.route('/quiz_general_detail/<detail_id>', methods=['PUT'])
def update_quiz_general_detail(detail_id: str):
    if detail_id is None:
        abort(404)

    request_data = None
    try:
        request_data = request.get_json()
    except Exception as e:
        abort(400, "Invalid JSON formart.")

    if request_data is None:
        abort(400)

    quiz_general_detail = question_controllers.read_quiz_general_detail(
        detail_id)

    for key, value in request_data.items():
        if (key not in ('id', 'created_at', 'updated_at', '__class__')):
            setattr(quiz_general_detail, key, value)

    quiz_general_detail.save()

    return jsonify(quiz_general_detail.to_json())


@app_views.route('/quiz_general_detail/<detail_id>', methods=['DELETE'])
def delete_quiz_general_detail(detail_id: str):
    if detail_id is None:
        abort(404)
    if question_controllers.delete_quiz_general_detail(detail_id):
        return jsonify({"success": "Deleted Successfully"})
    return jsonify({"error": "Details not found"})


# Quiz CRUD


@app_views.route('/quiz', methods=['POST'])
def create_quiz():
    request_data = None
    try:
        request_data = request.get_json()
    except Exception as e:
        abort(400, "Invalid JSON formart.")

    for field in ["question", "answer_type", "general_detail_id"]:
        if field not in request_data:
            abort(400, f"{field} is required")

    if "choices" in request_data:
        choices = request_data["choices"]

        request_data.pop("choices")

        return jsonify(question_controllers.create_quiz_with_choices(
            request_data, choices))

    return jsonify(question_controllers.create_quiz(
        request_data).to_json())


@app_views.route('/quiz/<quiz_id>', methods=['GET'])
def read_quiz(quiz_id: str):
    if quiz_id is None:
        abort(404)

    quiz = question_controllers.read_quiz(quiz_id)

    return {**quiz.to_json(),
            "choices": [{"id": choice.id, "name": choice.name} for choice in quiz.choices]}


@app_views.route('/quiz/', methods=['GET'])
def read_quizes_paginated():

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    if page is None or per_page is None:
        abort(400, "Missing required arguments")

    quizes = question_controllers.read_quizes_paginated(page, per_page)

    data, total = quizes.values()

    return jsonify({
        'data': [{
            **quiz.to_json(),
            "choices": [
                {"id": choice.id, "name": choice.name} for choice in quiz.choices]
        } for quiz in data],
        'total': total,
        'pages': math.ceil(total / per_page),
        'prev_num': page - 1 if page > 1 else None,
        'next_num': page + 1 if page * per_page < total else None
    })


@app_views.route('/quiz/<quiz_id>', methods=['PUT'])
def update_quiz(quiz_id: str):
    if quiz_id is None:
        abort(404)

    request_data = None
    try:
        request_data = request.get_json()
    except Exception as e:
        abort(400, "Invalid JSON formart.")

    if request_data is None:
        abort(400)

    quiz = question_controllers.read_quiz(quiz_id)

    for key, value in request_data.items():
        if (key not in ('id', 'created_at',
                        'updated_at', '__class__', 'choices')):
            setattr(quiz, key, value)

    if request_data["answer_type"] == "multiple":

        if "choices" in request_data:
            for choice in quiz.choices:
                models.storage.delete(choice)
                make_transient(choice)

            quiz.choices = [Choice(name=choice)
                            for choice in request_data["choices"]]
            quiz.save()
            return {**quiz.to_json(),
                    "choices": [{"id": choice.id, "name": choice.name} for choice in quiz.choices]}

    else:
        for choice in quiz.choices:
            models.storage.delete(choice)
            make_transient(choice)

    quiz.save()

    return jsonify(quiz.to_json())


@app_views.route('/quiz/<quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id: str):
    if quiz_id is None:
        abort(404)
    if question_controllers.delete_quiz(quiz_id):
        return jsonify({"success": "Deleted Successfully"})
    return jsonify({"error": "Details not found"})


# Answers CRUD
@app_views.route('/submit_answers', methods=['POST'])
def submit_answers():
    request_data = None
    try:
        request_data = request.get_json()
    except Exception as e:
        abort(400, "Invalid JSON formart.")

    return jsonify(question_controllers.submit_answers(request_data))


@app_views.route('/get_user_quiz_results/', methods=['GET'])
def get_user_quiz_results(user_id):
    user_id = request.current_user.id
    return jsonify(question_controllers.get_user_quiz_results(user_id))


@app_views.route('/get_quiz_user_result/<general_detail_id>',
                 methods=['GET'])
def get_quiz_user_result(general_detail_id):
    user_id = request.current_user.id

    if general_detail_id is None:
        abort(404)

    return jsonify(question_controllers.get_user_quiz_result(user_id, general_detail_id))
