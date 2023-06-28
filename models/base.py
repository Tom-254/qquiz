#!/usr/bin/python3
"""
    This module defines the BaseModel class
"""

import uuid
from datetime import datetime
from typing import TypeVar, List, Iterable
import models
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime

Base = declarative_base()


class BaseModel:
    """
        Base class inheritated by other classes
    """

    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow(),
                        nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow(),
                        nullable=False)

    def __init__(self, *args, **kwargs):
        """
            Initialize public instance attributes.
        """
        if (len(kwargs) == 0):
            self.id = str(uuid.uuid4())
            self.created_at = datetime.now()
            self.updated_at = datetime.now()

        else:
            try:
                time_format = "%Y-%m-%dT%H:%M:%S.%f"
                kwargs["created_at"] = datetime.strptime(kwargs["created_at"],
                                                         time_format)
                kwargs["updated_at"] = datetime.strptime(kwargs["updated_at"],
                                                         time_format)
            except KeyError:
                self.id = str(uuid.uuid4())
                self.created_at = datetime.now()
                self.updated_at = datetime.now()
            for key, val in kwargs.items():
                if "__class__" not in key:
                    setattr(self, key, val)

    def __str__(self):
        """
            Return string representation of BaseModel class
        """
        return ("[{}] ({}) {}".format(self.__class__.__name__,
                                      self.id, self.__dict__))

    def __repr__(self):
        """
            Return string representation of BaseModel class
        """
        return ("[{}] ({}) {}".format(self.__class__.__name__,
                                      self.id, self.__dict__))

    def __eq__(self, other):
        """ Equality
        """
        if type(self) != type(other):
            return False
        if not isinstance(self, Base):
            return False
        return (self.id == other.id)

    def save(self):
        """
            Update the updated_at attribute with new.
        """
        self.updated_at = datetime.now()
        models.storage.new(self)
        models.storage.save()

    def remove(self):
        """ Remove object
        """
        models.storage.delete(self);

    def to_dict(self):
        """
            Return dictionary representation of BaseModel class.
        """
        copy_dict = dict(self.__dict__)
        try:
            del copy_dict['_sa_instance_state']
        except KeyError:
            pass
        copy_dict['__class__'] = self.__class__.__name__
        copy_dict['updated_at'] = self.updated_at.strftime(
            "%Y-%m-%dT%H:%M:%S.%f")
        copy_dict['created_at'] = self.created_at.strftime(
            "%Y-%m-%dT%H:%M:%S.%f")

        return (copy_dict)

    def to_json(self, for_serialization: bool = False) -> dict:
        """ Convert the object a JSON dictionary
        """
        result = {}
        for key, value in self.__dict__.items():
            if not for_serialization and key[0] == '_':
                continue
            if type(value) is datetime:
                result[key] = value.strftime("%Y-%m-%dT%H:%M:%S.%f")
            else:
                result[key] = value
        return result

    def delete(self):
        """
            Deletes the current instance from the storage
                by calling the method delete.
        """
        return models.storage.delete(self)

    def add_obj(self):
        models.storage.new(self)

    @classmethod
    def count(cls) -> int:
        """ Count all objects
        """
        return models.storage.count(cls)

    @classmethod
    def all(cls) -> Iterable[TypeVar('Base')]:
        """ Return all objects
        """
        return cls.search()

    @classmethod
    def get(cls, id: str) -> TypeVar('Base'):
        """ Return one object by ID
        """
        return models.storage.get(cls, id)

    @classmethod
    def search(cls, attributes: dict = {}) -> List[TypeVar('Base')]:
        """ Search all objects with matching attributes
        """
        def _search(obj, attributes: dict = {}) -> bool:
            if len(attributes) == 0:
                return True
            for k, v in attributes.items():
                if (getattr(obj, k) != v):
                    return False
            return True
        return list(filter(_search, models.storage.all(cls.__name__).values()))

    @classmethod
    def bulk_insert(cls, objs):
        """
        Adds many objects of the same type to the database
        """
        models.storage.add_all(objs)
        models.storage.save()

    @classmethod
    def get_paginated_data(cls, page: int, per_page: int):
        return models.storage.get_paginated(cls, page, per_page)

    @classmethod
    def get_query(cls):
        return models.storage.get_query(cls)

    @classmethod
    def get_user_with_email(cls, email: str):
        return models.storage.get_user_with_email(email)

    @classmethod
    def get_user_with_session(cls, session_id: str):
        return models.storage.get_user_with_session_id(session_id)
