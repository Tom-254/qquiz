#!/usr/bin/python3
"""
    Package Initializer
"""

from models.base_model import BaseModel
from models.user import User
from models.images import Image
from models.shared_with import SharedWith
from models.engine.db_storage import DBStorage

classes = {"User": User, "BaseModel": BaseModel,
           "Image": Image, "SharedWith": SharedWith}

storage = DBStorage()
storage.reload()
