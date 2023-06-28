#!/usr/bin/env python3
"""Flask view module that handles all routes
for the Session authentication
"""
import os
from typing import Tuple
from flask import abort, jsonify, request, make_response

from models.user import User
from api.v1.views import app_views
from flask_cors import cross_origin


@app_views.route('/auth_session/login', methods=['POST'], strict_slashes=False)
def login():
    """POST /api/v1/auth_session/login
    Return:
      - JSON representation of a User object.
    """
    error_not_found =  "no user found for this email"
    try:
        request_data = request.get_json()
    except Exception as ex:
        return jsonify('Not a JSON'), 400

    email = request_data.get('email')
    if not email or not email.strip():
        return jsonify("email missing"), 400
    password = request_data.get('password')
    if not password or not password.strip():
        return jsonify("password missing"), 400

    user = User.get_user_with_email(email)
    if not user:
        return jsonify(error_not_found), 404

    if user.is_valid_password(password):

        from api.v1.app import auth
        sessiond_id = auth.create_session(getattr(user, 'id'))
        res = jsonify(user.to_json())
        res.set_cookie(os.getenv("SESSION_NAME"), sessiond_id, secure=True, samesite='None')
        return make_response(res)
    return jsonify("wrong password"), 401


@app_views.route(
    '/auth_session/logout', methods=['DELETE'], strict_slashes=False)
def logout():
    """DELETE /api/v1/auth_session/logout
    Return:
      - An empty JSON object.
    """
    from api.v1.app import auth
    if not auth.destroy_sessionm(request):
        abort(404)
    return jsonify("Logged out successfully"), 200
