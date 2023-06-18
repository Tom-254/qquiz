#!/usr/bin/python3

from flask import Blueprint, request

choices_bp = Blueprint('choices', __name__)

@choices_bp.route('/<questionId>', methods=['POST'])
def add_choice(questionId):
    # Handle choice addition logic
    pass

@choices_bp.route('/<choiceId>', methods=['GET'])
def get_choice(choiceId):
    # Retrieve choice details
    pass

@choices_bp.route('/<choiceId>', methods=['PUT'])
def update_choice(choiceId):
    # Handle choice update logic
    pass

@choices_bp.route('/<choiceId>', methods=['DELETE'])
def delete_choice(choiceId):
    # Handle choice deletion logic
    pass
