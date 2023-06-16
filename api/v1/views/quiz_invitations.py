#!/usr/bin/python3

from flask import Blueprint, request

invitations_bp = Blueprint('invitations', __name__)

@invitations_bp.route('/<quizId>', methods=['POST'])
def send_invitation(quizId):
    # Handle quiz invitation logic
    pass

@invitations_bp.route('/<invitationId>', methods=['GET'])
def get_invitation(invitationId):
    # Retrieve quiz invitation details
    pass

@invitations_bp.route('/<invitationId>', methods=['PUT'])
def update_invitation(invitationId):
    # Handle quiz invitation status update logic
    pass

