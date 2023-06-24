#!/usr/bin/python3
"""
    Implementation of the User class which inherits from BaseModel
"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String

class QuestionCategory(BaseModel, Base):
    __tablename__ = 'question_category'
    name = Column(String(128), unique=True, nullable=False)