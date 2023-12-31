#!/usr/bin/python3
"""
    Implementation of the QuestionGeneralDetail class which inherits from BaseModel
"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.orm import relationship


class QuestionGeneralDetail(BaseModel, Base):
    """
    Definition of the QuestionGeneralDetail class
    """
    __tablename__ = "question_general_detail"
    title = Column(String(128), nullable=False, unique=True)
    category_id = Column(String(128), ForeignKey('question_category.id'), nullable=False)
    desription = Column(Text, nullable=False)
    questions  = relationship("Question", backref="general_detail",
                                cascade="delete")

