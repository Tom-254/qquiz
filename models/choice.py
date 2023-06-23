#!/usr/bin/python3
"""
    Implementation of the QuestionGeneralDetail class which inherits from BaseModel
"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey

class Choice(BaseModel, Base):
    __tablename__ = 'choice'
    name = Column(String(128))
    question_id = Column(String(60), ForeignKey('question.id'))