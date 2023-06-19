#!/usr/bin/python3
"""
    Package Initializer
"""

from models.base_model import BaseModel
from models.user import User
from models.answers import Answers
from models.choices import Choices
from models.index import Index
from models.questions import Questions
from models.quiz_invitations import Quiz_invitations
from models.quiz_submissions import Quiz_submissions
from models.quizzes import Quizzes
from models.engine.db_storage import DBStorage

classes = {"User": User, "BaseModel": BaseModel,
           "Answers": Answers, "Choices": Choices, "Index": Index, "Questions": Questions,
           "Quiz_invitations": Quiz_invitations, "Quiz_submissions": Quiz_submissions,
           "Quizzes": Quizzes}

storage = DBStorage()
storage.reload()
