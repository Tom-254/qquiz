#!/usr/bin/env python3
"""SessionDBAuth authentication module allowing expiration
and storage support
"""
from flask import request
from datetime import datetime, timedelta

from models.user_session import UserSession
from .session_exp_auth import SessionExpAuth


class SessionDBAuth(SessionExpAuth):
    """SessionDBAuth that models session authentication
    """

    def create_session(self, user_id=None) -> str:
        """Creates a Session ID for a user_id
        """
        session_id = super().create_session(user_id)
        if type(session_id) == str:
            kwargs = {
                'user_id': user_id,
                'session_id': session_id,
            }
            user_session = UserSession(**kwargs)
            user_session.save()
            return session_id

    def user_id_for_session_id(self, session_id=None):
        """Returns a User ID based on a Session ID:
        """
        session = UserSession.get_user_with_session(session_id)
        if session is None:
            return None

        cur_time = datetime.now()
        time_span = timedelta(seconds=self.session_duration)
        exp_time = session.created_at + time_span
        if exp_time < cur_time:
            return None
        return session.user_id

    def destroy_session(self, request=None) -> bool:
        """Deletes the user session / logout
        """
        session_id = self.session_cookie(request)
        session = UserSession.get_user_with_session(session_id)
        if session is None:
            print("None")
            return False

        session.remove()
        return True
