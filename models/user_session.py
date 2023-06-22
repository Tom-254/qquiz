#!/usr/bin/env python3
"""User session module.
"""
from sqlalchemy import Column, ForeignKey, String
from models.base import BaseModel, Base


class UserSession(BaseModel, Base):
    """Class UserSession inherits from Base
    """
    __tablename__ = "session_user"
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    session_id = Column(String(60), nullable=False)

    def __init__(self, *args: list, **kwargs: dict):
        """Initializes a UserSession instance.
        """
        super().__init__(*args, **kwargs)
        self.user_id = kwargs.get('user_id')
        self.session_id = kwargs.get('session_id')
