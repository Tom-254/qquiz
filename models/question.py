#!/usr/bin/python3
"""
    Implementation of the User class which inherits from BaseModel
"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Enum
from sqlalchemy.orm import relationship


class Question(BaseModel, Base):
    __tablename__ = 'question'
    question = Column(String(128), nullable=False)
    answer_type = Column(Enum('multiple', 'description'))
    visibility = Column(Enum('public', 'private'))
    general_detail_id = Column(String(128), ForeignKey('question_general_detail.id'))
    choices = relationship('Choice', backref='question')
