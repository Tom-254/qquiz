#!/usr/bin/python3
"""
    Define the class  Quizzes
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, ForeignKey, String



class Quizzes(BaseModel, Base):
    """
        Define the class SharedWith that inherits from BaseModel.
    """
	 __tablename__ = "quizzes"
	quiz_id = Column(Integer, primary_key = True)
	user_id = Column(String(60), ForeignKey('users.id'), nullable=False)

	def __init__(self, *args, **kwargs):
	"""initializes Image"""
		super().__init__(*args, **kwargs)
