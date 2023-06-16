#!/usr/bin/python3

from flask import Blueprint, request

questions_bp = Blueprint('questions', __name__)

@questions_bp.route('/<quizId>', methods=['POST'])
def add_question(quizId):
    # Handle question addition logic
    pass

@questions_bp.route('/<questionId>', methods=['GET'])
def get_question(questionId):
    # Retrieve question details
    pass

@questions_bp.route('/<questionId>', methods=['PUT'])
def update_question(questionId):
    # Handle question update logic
    pass

@questions_bp.route('/<questionId>', methods=['DELETE'])
def delete_question(questionId):
    # Handle question deletion logic
    pass
