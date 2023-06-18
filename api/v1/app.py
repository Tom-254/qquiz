#!/usr/bin/python3
"""
Entry point for flask
"""
from flask import Flask, jsonify, make_response
from models import storage
from api.v1.views import app_views
from os import getenv
from  flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={"/*": {"origins": ['0.0.0.0', 'http://localhost:3000']}})
app.url_map.strict_slashes = False
app.register_blueprint(app_views)
@app.errorhandler(405)
def method_not_allowed(error):
    return make_response(jsonify({"error" : "Method not allowed"}), 405)

@app.errorhandler(404)
def not_found(error):
    """returns a JSON-formatted 404 status code response."""
    return make_response(jsonify({"error": "Not found"}), 404)


@app.teardown_appcontext
def teardown_appcontext(error):
    """teardown_appcontext"""
    storage.close()
    pass


if __name__ == "__main__":
    host = getenv('QQUIZ_API_HOST', '0.0.0.0')
    port = getenv('QQUIZ_API_PORT', '5000')
    app.run(host=host, port=port, threaded=True, debug=True)
