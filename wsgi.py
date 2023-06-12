#!/usr/bin/python3
"""wsgi entry point"""
from api.v1.app import app;

if __name__ == "__main__":
    app.run()