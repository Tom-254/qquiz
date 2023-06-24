from flask import request, jsonify, abort

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

    for field in ["title", "category_id", "description", "user_id"]:
        if field not in request_data:
            abort(400, f"{field} is required")

    return jsonify(question_controllers.create_quiz_general_detail(
        request_data).to_json())


@app_views.route('/quiz_general_detail/<detail_id>', methods=['GET'])
def read_quiz_general_detail(detail_id: str):
    if detail_id is None:
        abort(404)

    return jsonify(question_controllers.read_quiz_general_detail(detail_id).to_json())


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

    quiz_general_detail = question_controllers.read_quiz_general_detail(detail_id)

    for key, value in request_data.items():
        if (key not in ('id', 'created_at', 'updated_at', 'email', '__class__')):
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

    for field in ["question", "answer_type", "general_detail_id", "user_id", "visibility"]:
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

    return jsonify(question_controllers.read_quiz(quiz_id).to_json())


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
                        'updated_at', 'email', '__class__', 'choices')):
            setattr(quiz, key, value)

    if "choices" in request_data:
        quiz.choices = request_data["choices"]
    quiz.save()

    return jsonify(quiz.to_json())


@app_views.route('/quiz/<quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id: str):
    if quiz_id is None:
        abort(404)
    if question_controllers.delete_quiz(quiz_id):
        return jsonify({"success": "Deleted Successfully"})
    return jsonify({"error": "Details not found"})


# Choice CRUD
@app_views.route('/choice', methods=['POST'])
def create_choice():
    pass


@app_views.route('/choice/<choice_id>', methods=['GET'])
def read_choice(choice_id: str):
    pass


@app_views.route('/choice/<choice_id>', methods=['PUT'])
def update_choice(choice_id: str):
    pass


@app_views.route('/choice/<choice_id>', methods=['DELETE'])
def delete_choice(choice_id: str):
    pass
