#!/usr/bin/python3
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

@app_views.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    # Other headers can be added here if needed
    return response

from api.v1.views.index import *
from api.v1.views.users import *
from api.v1.views.session_auth import *
from api.v1.views.questions import *