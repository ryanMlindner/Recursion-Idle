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

db = client.idleSaves
saveCollection = db.saves

class saveFile:
    def __init__(self, username, saveString):
        self.username = username
        self.saveString = saveString
        self.user_id = ''

    def exists(self):
        if (saveCollection.find_one({'username': self.username}) == None):
            return False
        else:
            return True

    def getID(self):
        if (self.exists()):
            user = saveCollection.find_one({'username': self.username})
            self.user_id = user._id

    def postData(self):
        id = saveCollection.insert_one({
            "username" : self.username, 
            "saveFile" : self.saveString
            })
        self.user_id = id.inserted_id

    def updateData(self):
        self.getID
        saveCollection.update_one({
            '_id': self.user_id},{
            'saveFile': self.saveString
            })

    def getSaveFile(self):
        self.getID
        save = saveCollection.find_one({'_id' : self.user_id})
        self.username = save.username
        self.saveString = save.saveFile
    
    def delete(self):
        self.getID
        if (saveCollection.find_one({'username': 'user'}) != None):
            saveCollection.delete_one({'_id' : self.user_id})
        else: return False

# TODO FETCH!! YAY MORE NEW STUFF DEAR GOD WHEN WILL THIS END. NEVER? Oh. aight.
# TODO learn fetch first, then work on this stuff. one step at a time <3


@app.route('/dbConnect', methods=['GET', 'POST', 'PUT', 'DELETE'])
def dbConnect():

    # whatever we do with the savefile, we need to parse it first
    bundledSaveUsername = request.json
    saveStringUsernameAppended = bundledSaveUsername.__str__()
    identifier = saveStringUsernameAppended.split(',', 1)
    # create a savefile class to handle mongoDB stuff in for readability
    userName = identifier[0]
    saveString = identifier[1]
    save = saveFile(userName, saveString)

    if (request.method == 'GET'):
        save.getSaveFile
        serverResponse = 'savefile retrieved successfully'
        packagedSave = save.username + save.saveString
        return  jsonify(packagedSave)

    if (request.method == 'POST'):
        if (save.exists):
            serverResponse = 'username exists, try something more original'
        else :
            save.postData
            serverResponse = 'savefile created successfully'
        return jsonify(serverResponse)

    if (request.method == 'PUT'):
        if (save.exists):
            save.postData
            serverResponse = 'savefile updated successfully'
        return jsonify(serverResponse)

    if (request.method == 'DELETE'):
        if (save.exists):
            save.delete
            serverResponse = 'savefile deleted successfully'
        return jsonify(serverResponse)

# TODO refactor to serve for prod instead of this
if __name__ == "__main__":
    app.run()