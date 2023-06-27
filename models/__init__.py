#!/usr/bin/python3
"""
    Package Initializer
"""

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
