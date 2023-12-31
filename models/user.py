#!/usr/bin/python3
"""
    Implementation of the User class which inherits from BaseModel
"""
import hashlib
from models.base import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """
    Definition of the User class
    """
    __tablename__ = "users"
    email = Column(String(128), nullable=False, unique=True)
    full_name = Column(String(128), nullable=False)
    _password = Column(String(128), nullable=False)
    profile_image = Column(String(128), nullable=True)
    session_user = relationship("UserSession", backref="user",
                                cascade="delete")
    questions = relationship('Question', backref='user')


    def __init__(self, *args: list, **kwargs: dict):
        """ Initialize a User instance
        """
        super().__init__(*args, **kwargs)
        self.email = kwargs.get('email')
        self._password = kwargs.get('password')
        self.full_name = kwargs.get('full_name')
        self.profile_image = kwargs.get("profile_image");

    @property
    def password(self) -> str:
        """ Getter of the password
        """
        return self._password

    @password.setter
    def password(self, pwd: str):
        """ Setter of a new password: encrypt in SHA256
        """
        if pwd is None or type(pwd) is not str:
            self._password = None
        else:
            self._password = hashlib.sha256(pwd.encode()).hexdigest().lower()

    def is_valid_password(self, pwd: str) -> bool:
        """ Validate a password
        """
        if pwd is None or type(pwd) is not str:
            return False
        if self.password is None:
            return False
        pwd_e = pwd.encode()
        return hashlib.sha256(pwd_e).hexdigest().lower() == self.password

    def display_name(self) -> str:
        """ Display User name based on email/full_name/last_name
        """
        if self.email is None and self.full_name is None:
            return ""
        if self.full_name is None:
            return "{}".format(self.email)
        else:
            return "{} {}".format(self.full_name)
