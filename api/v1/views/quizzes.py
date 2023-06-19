#!/usr/bin/python3

from flask import Blueprint, request

quizzes_bp = Blueprint('quizzes', __name__)

@quizzes_bp.route('/', methods=['POST'])
def create_quiz():
    # Handle quiz creation logic
    pass

@quizzes_bp.route('/<quizId>', methods=['GET'])
def get_quiz(quizId):
    # Retrieve quiz details
    pass

@quizzes_bp.route('/<quizId>', methods=['PUT'])
def update_quiz(quizId):
    # Handle quiz update logic
    pass

@quizzes_bp.route('/<quizId>', methods=['DELETE'])
def delete_quiz(quizId):
    # Handle quiz deletion logic
    pass

@quizzes_bp.route('/<quizId>/questions', methods=['GET'])
def get_questions(quizId):
    # Retrieve a list of all questions for a specific quiz
    pass

@quizzes_bp.route('/<quizId>/questions', methods=['POST'])
def new_question(quizId):
    # Add a new question to a specific quiz
    pass

@quizzes_bp.route('/<quizId>/questions/<questionId>', methods=['GET'])
def get_questionId(questionId):
    # Retrieve a specific question by its ID
    pass

@quizzes_bp.route('/<quizId>/questions/<questionId>', methods=['PUT'])
def update_question(questionId):
    # Update a specific question by its ID
    pass


@quizzes_bp.route('/quizzes<quizId>/questions<questionId>', methods=['DELETE'])
def delete_question(questionId):
    # Delete a specific question by its ID
    pass


@quizzes_bp.route('/quizzes<quizId>/invitations', methods=['POST'])
def quiz_invite():
    # Invite friends to take a specific quiz
    pass


@quizzes_bp.route('/quizzes<quizId>/submissions', methods=['POST'])
def quiz_submission():
    # Submit answer to a specific quiz


