#!/usr/bin/python3
"""
    Define the class SharedWith.
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, ForeignKey, String


class SharedWith(BaseModel, Base):
    """
        Define the class SharedWith that inherits from BaseModel.
    """
    __tablename__ = "shared_with"
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    image_id = Column(String(60), ForeignKey('images.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes Image"""
        super().__init__(*args, **kwargs)


