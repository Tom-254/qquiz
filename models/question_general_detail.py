#!/usr/bin/python3
"""
    Implementation of the QuestionGeneralDetail class which inherits from BaseModel
"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship


class QuestionGeneralDetail(BaseModel, Base):
    """
    Definition of the QuestionGeneralDetail class
    """
    __tablename__ = "question_general_detail"
    title = Column(String(128), nullable=False)
    category_id = Column(String(60), ForeignKey(
        'question_category.id'), nullable=False)
    category = relationship('QuestionCategory', backref='general_details')
    user_id = Column(String(60), ForeignKey('users.id'))
    user = relationship('User', backref='general_details')
    description = Column(Text, nullable=False)
    visibility = Column(Enum('public', 'private'))
    questions = relationship("Question", backref="general_detail",
                             cascade="delete")
