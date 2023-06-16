#!/usr/bin/python3

from flask import Blueprint, request

answers_bp = Blueprint('answers', __name__)

@answers_bp.route('/<questionId>', methods=['POST'])
def add_answer(questionId):
    # Handle answer addition logic
    pass

@answers_bp.route('/<answerId>', methods=['GET'])
def get_answer(answerId):
    # Retrieve answer details
    pass

@answers_bp.route('/<answerId>', methods=['PUT'])
def update_answer(answerId):
    # Handle answer update logic
    pass

@answers_bp.route('/<answerId>', methods=['DELETE'])
def delete_answer(answerId):
    # Handle answer deletion logic
    pass
