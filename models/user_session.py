#!/usr/bin/env python3
"""User session module.
"""
from models.base import BaseModel, Base


class UserSession(BaseModel, Base):
    """Class UserSession inherits from Base
    """

    def __init__(self, *args: list, **kwargs: dict):
        """Initializes a UserSession instance.
        """
        super().__init__(*args, **kwargs)
        self.user_id = kwargs.get('user_id')
        self.session_id = kwargs.get('session_id')
