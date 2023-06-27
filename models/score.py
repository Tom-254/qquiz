#!/usr/bin/python3
"""
    Implementation of the User class which inherits from BaseModel
"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

class Score(BaseModel, Base):
    __tablename__ = 'score'
    user_id = Column(String(60), ForeignKey('users.id'))
    user = relationship('User', backref='scores')
    general_detail_id = Column(String(60), ForeignKey('question_general_detail.id'))
    general_detail = relationship('QuestionGeneralDetail', backref='scores')
    score = Column(Integer)
