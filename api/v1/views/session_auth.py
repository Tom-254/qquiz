#!/usr/bin/env python3
"""Flask view module that handles all routes
for the Session authentication
"""
import os
from typing import Tuple
from flask import abort, jsonify, request, make_response

from models.user import User
from api.v1.views import app_views


@app_views.route('/auth_session/login', methods=['POST'], strict_slashes=False)
def login() -> Tuple[str, int]:
    """POST /api/v1/auth_session/login
    Return:
      - JSON representation of a User object.
    """
    error_not_found = {"error": "no user found for this email"}
    try:
        request_data = request.get_json()
    except Exception as ex:
        return make_response(jsonify({'error': 'Not a JSON', "status" : 400}))

    email = request_data.get('email')
    if not email or not email.strip():
        return jsonify({"error": "email missing"}), 400
    password = request_data.get('password')
    if not password or not password.strip():
        return jsonify({"error": "password missing"}), 400
    try:
        users = User.search({'email': email})
    except Exception:
        return jsonify(error_not_found), 404
    if len(users) <= 0:
        return jsonify(error_not_found), 404
    if users[0].is_valid_password(password):

        from api.v1.app import auth
        sessiond_id = auth.create_session(getattr(users[0], 'id'))
        res = jsonify(users[0].to_json())
        res.set_cookie(os.getenv("SESSION_NAME"), sessiond_id)
        return res
    return jsonify({"error": "wrong password"}), 401


@app_views.route(
    '/auth_session/logout', methods=['DELETE'], strict_slashes=False)
def logout() -> Tuple[str, int]:
    """DELETE /api/v1/auth_session/logout
    Return:
      - An empty JSON object.
    """
    from api.v1.app import auth
    if not auth.destroy_session(request):
        abort(404)
    return jsonify({"success": "Logged out successfully"})
