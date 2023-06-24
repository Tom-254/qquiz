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
        abort(400, description="Invalid JSON formart.")

    for field in ["title", "category_id", "description", "user_id"]:
        if field not in request_data:
            abort(400,f"{field} is required")

    return jsonify(question_controllers.create_quiz_general_detail(
        request_data).to_json())


@app_views.route('/quiz_general_detail/<detail_id>', methods=['GET'])
def read_quiz_general_detail(detail_id: str):
    pass


@app_views.route('/quiz_general_detail/<detail_id>', methods=['PUT'])
def update_quiz_general_detail(detail_id: str):
    pass


@app_views.route('/quiz_general_detail/<detail_id>', methods=['DELETE'])
def delete_quiz_general_detail(detail_id: str):
    pass

# Quiz CRUD


@app_views.route('/quiz', methods=['POST'])
def create_quiz():
    pass


@app_views.route('/quiz/<quiz_id>', methods=['GET'])
def read_quiz(quiz_id: str):
    pass


@app_views.route('/quiz/<quiz_id>', methods=['PUT'])
def update_quiz(quiz_id: str):
    pass


@app_views.route('/quiz/<quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id: str):
    pass


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
