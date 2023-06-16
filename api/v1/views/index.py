from api.v1.views import app_views
from flask import jsonify
from models import storage


@app_views.route('/status', methods=['GET'])
def get_status():
    status = {
        "quizzes": storage.count("Quizzes"),
    }
    return jsonify(status)

