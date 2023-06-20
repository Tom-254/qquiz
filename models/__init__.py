#!/usr/bin/python3
"""
    Package Initializer
"""

from models.base_model import BaseModel
from models.user import User
from models.quizzes import Quizzes
from models.engine.db_storage import DBStorage

classes = {"User": User, "BaseModel": BaseModel, "Index": Index,
           "Quizzes": Quizzes}

storage = DBStorage()
storage.reload()
