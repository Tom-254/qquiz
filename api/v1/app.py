#!/usr/bin/python3
"""
Entry point for flask
"""
from flask import Flask, jsonify, abort, request
from models import storage
from api.v1.views import app_views
from os import getenv
from flask_cors import CORS

from api.v1.auth.session_db_auth import SessionDBAuth

app = Flask(__name__)
CORS(app, resources={
     "/api/v1/*": {"origins": ['0.0.0.0', 'http://localhost:5173/']}})
app.url_map.strict_slashes = False
app.register_blueprint(app_views)

auth = SessionDBAuth()


@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": error.description or "Missing required fields" }), 400

@app.errorhandler(404)
def not_found(error) -> str:
    """ Not found handler
    """
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(401)
def unauthorized(error) -> str:
    """Unauthorized handler.
    """
    return jsonify({"error": "Unauthorized"}), 401


@app.errorhandler(403)
def forbidden(error) -> str:
    """Forbidden handler.
    """
    return jsonify({"error": "Forbidden"}), 403


@app.before_request
def authenticate_user():
    """Validates all requests to secure the API:
    """
    excluded_paths = [
        ('/api/v1/status/', 'GET,POST,DELETE,PATCH,PUT'),
        ('/api/v1/status', 'GET,POST,DELETE,PATCH,PUT'),
        ('/api/v1/unauthorized/', 'GET,POST,DELETE,PATCH,PUT'),
        ('/api/v1/unauthorized', 'GET,POST,DELETE,PATCH,PUT'),
        ('/api/v1/forbidden/', 'GET,POST,DELETE,PATCH,PUT'),
        ('/api/v1/forbidden', 'GET,POST,DELETE,PATCH,PUT'),
        ('/api/v1/auth_session/login/', 'GET,POST,DELETE,PATCH,PUT'),
        ('/api/v1/auth_session/login', 'GET,POST,DELETE,PATCH,PUT'),
        ('/api/v1/users', 'POST'),
        ('/api/v1/users/', 'POST'),
    ]
    if auth and auth.require_auth(request.path, excluded_paths, request.method):
        user = auth.current_user(request)
        if auth.session_cookie(request) is None:
            abort(401)

        if user is None:
            abort(403)
        request.current_user = user


@app.teardown_appcontext
def teardown_appcontext(error):
    """teardown_appcontext"""
    storage.close()


if __name__ == "__main__":
    host = getenv('QQUIZ_API_HOST', '0.0.0.0')
    port = getenv('QQUIZ_API_PORT', '5000')
    app.run(host=host, port=port, threaded=True, debug=True)
