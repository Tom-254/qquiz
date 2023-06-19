#!/usr/bin/python3
"""
    Define the class Image.
"""
from models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, ForeignKey, String


class Image(BaseModel, Base):
    """
        Define the class Image that inherits from BaseModel.
    """
    __tablename__ = "images"
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    image_name = Column(String(128), nullable=False)
    image_path = Column(String(128), nullable=False)
    image_description = Column(String(1024), nullable=False)
    shared_with = relationship("SharedWith", backref="image",
                               cascade="delete")
