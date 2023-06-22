#!/usr/bin/python3
"""
    Declaration for database storage
"""
import os
from sqlalchemy import create_engine
from models.base_model import Base
from models.user import User
from sqlalchemy.orm import sessionmaker, scoped_session


class DBStorage():
    """
    Database storage class
    """
    __engine = None
    __session = None

    def __init__(self):
        """
        Creates engine connection
        """
        username = os.getenv('ISHARE_MYSQL_USER', default=None)
        password = os.getenv('ISHARE_MYSQL_PWD', default=None)
        db_host = os.getenv('ISHARE_MYSQL_HOST', default=None)
        db_name = os.getenv('ISHARE_MYSQL_DB', default=None)
        connection = 'mysql+mysqldb://{}:{}@{}/{}'
        self.__engine = create_engine(connection.format(
            username, password, db_host, db_name), pool_pre_ping=True)

    def all(self, cls=None):
        """
        Queries current database session based on class.
        Returns a dictionary representation of the query.
        """
        result = []
        new_dict = {}
        if cls is not None:
            result = self.__session.query(eval(cls)).all()
            for item in result:
                key = item.__class__.__name__ + '.' + item.id
                new_dict[key] = item
        else:
            classes = [User, Image, SharedWith]
            for class_name in classes:
                try:
                    result = (self.__session.query(class_name).all())
                    for item in result:
                        key = item.__class__.__name__ + '.' + item.id
                        new_dict[key] = item
                except Exception:
                    continue
        return new_dict

    def new(self, obj):
        """
        Adds the object to the current database session
        """
        self.__session.add(obj)

    def get(self, cls, id):
        """
            Retrieve one object
            @cls: class name
            @id: string representing the object ID
            Return: Object based on the class name and its ID, or None if not found
        """
        obj = self.__session.query(cls).get(id)
        if obj is None:
            return None
        return obj

    def get_user_with_email(self, email):
        """
        Gets a user object base on the email
        """
        obj = self.__session.query(User).filter_by(email=email).first()
        if obj is None:
            return None
        return obj

    def count(self, cls=None):
        """
            Count the number of objects in storage:
            @cls: class name
            Return:
        """
        objs = self.all(cls)
        return (len(objs))

    def save(self):
        """
        Commits all changes of the current database session
        """
        self.__session.commit()

    def delete(self, obj=None):
        """
        Deletes from the current database session obj if not None
        """
        if obj is not None:
            self.__session.delete(obj)
            self.save()

    def reload(self):
        """
        Creates all tables in the database.
        """
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(
            bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session()

    def close(self):
        """ closes a session"""
        self.__session.close()
