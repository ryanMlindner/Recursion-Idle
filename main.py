# API necessities
# save database with user key and json string savefile
# CRUD
# restful constraints for reference
# uniform interface
# client // server
# stateless
# cacheable
# layered system
# code on demand (opt) (not doing)
# database host with mongoDB
# connect database to python with pymongo layer 1
# connect python to JS with ajax layer 2
# layer 3 is UI/control

import datetime
import os
import pymongo

from flask import Flask, jsonify, request, url_for, render_template
from dotenv import load_dotenv
from flask_restful import Resource, Api
from pymongo import MongoClient

load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# Connect to MongoDB cluster:
client = MongoClient(MONGODB_URI)

app = Flask(__name__,
            static_url_path='',
            static_folder='gameEngine/static',
            template_folder='gameEngine/templates')

@app.route('/')
def index():
    return render_template('index.html')

responseString = "Failed to create User: Default"

db = client.idleSaves
saveCollection = db.saves

class saveFile:
    def __init__(self, username, saveString):
        self.username = username
        self.saveString = saveString
        self.user_id = ''

    def exists(self):
        if (saveCollection.find_one({'username': 'user'}) == None):
            return False
        else:
            return True

    # CRUD
    def postData(self):
        id = saveCollection.insert_one({
            "username" : self.username, 
            "saveFile" : self.saveString
            })
        self.user_id = id.inserted_id

    def updateData(self):
        update_save = saveCollection.update_one({
            '_id': self.user_id},{
            'saveFile': self.saveString
            })

    def getSaveFile(self):
        return saveCollection.find_one({'_id' : self.user_id})
    
    def delete(self):
        if (saveCollection.find_one({'username': 'user'}) != None):
            saveCollection.delete_one({'_id' : self.user_id})
# TODO JQUERY!! YAY MORE NEW STUFF DEAR GOD WHEN WILL THIS END. NEVER? Oh. aight.

# get values from ajax?
# TODO rework logic to include correct parts of ajax on both sides (JS, PY)
userName = 'Test'
saveString = 'flubber'
serverAction = 'getputupdatedeletechooseone' #TODO vis a vis async promise or ajax
serverResponse = responseString

# container for new savestring before old can be safely deleted
updatedSave = ''

save = saveFile(userName, saveString)
if (serverAction == 'get'):
    save.getSaveFile
    updatedSave = save.saveString
    serverResponse = 'savefile retrieved successfully'
if (serverAction == 'put'):
    if (save.exists):
        serverResponse = 'username exists, try something more original'
    else :
        save.postData
        serverResponse = 'savefile created successfully'
if (serverAction == 'update'):
    save.postData
    serverResponse = 'savefile updated successfully'
if (serverAction == 'delete'):
    save.delete
    serverResponse = 'savefile deleted successfully'

# TODO refactor to serve for prod instead of this
if __name__ == "__main__":
    app.run(debug=True)