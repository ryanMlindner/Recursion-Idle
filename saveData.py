# API necessities
# save database (csv file? TODO figure out how to host a save database? external? idk)
# database consists of name : JSON save string? how to update saves? automatic?
# classic import/export functionality TBD
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
# connect to something we'll figure it out
from inspect import _void
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
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