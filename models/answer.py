#!/usr/bin/python3
"""
    Implementation of the User class which inherits from BaseModel
"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Answer(BaseModel, Base):
    __tablename__ = 'answer'
    question_id = Column(String(60), ForeignKey('question.id'))
    question = relationship('Question', backref='answers')
    user_id = Column(String(60), ForeignKey('users.id'))
    user = relationship('User', backref='answers')
    choice_id = Column(String(60), ForeignKey('choice.id'))
    choice = relationship('Choice')
    score = Column(Integer)