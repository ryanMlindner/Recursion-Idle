# API necessities
# save database (csv file? TODO figure out how to host a save database? external? idk)
# database consists of collections, mirror the object interface in JS code,
# 15 objects in code, store instances of each as a save file?
# action : http method
# save creation POST
# save deletion DELETE
# save update PUT
# restful constraints for reference
# uniform interface
# client // server
# stateless
# cacheable
# layered system
# code on demand (opt) (not doing)
# build API using FLASK
# database using MONGODB
# connecting using pymongo
# update/interact with flask

import datetime
import os

from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from dotenv import load_dotenv
from pymongo import MongoClient

# load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# connect to cluster:
client = MongoClient(MONGODB_URI)

# list all the databases in the cluster:
for db_info in client.list_database_names():
   print(db_info)

# flask app
saveStateApp = Flask(__name__)
# api instance
saveStateAPI = Api(saveStateApp)

# users api endpoints
class users(Resource):

    # HTTP GET
    def get(self):
        pass #placeholder get
    
    # HTTP POST
    def post(self):
        # if (!exist) -->
        pass #placeholder createe
    
    # HTTP PUT
    def put(self):
        pass #placeholder update/replace
    
    # HTTP DELETE
    def delete(self):
        pass #placeholder delete

# saves api endpoints
class saves(Resource):

    # HTTP GET
    def get(self):
        pass #placeholder get
    
    # HTTP POST
    def post(self):
        # if (!exist) -->
        pass #placeholder create
    
    # HTTP PUT
    def put(self):
        pass #placeholder update/replace
    
    # HTTP DELETE
    def delete(self):
        pass #placeholder delete

saveStateAPI.add_resource(users, '/users') #endpt
saveStateAPI.add_resource(saves, '/saves') #endpt

if __name__ == '__main__':
    saveStateApp.run()