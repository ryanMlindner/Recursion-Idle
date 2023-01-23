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

# TODO OOP
# separate into files for a python package

import datetime
import os
import pymongo
import json

from flask import Flask, jsonify, request, url_for, render_template
from dotenv import load_dotenv
from flask_restful import Resource, Api
from pymongo import MongoClient

debug = True

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

#database connection
db = client.idleSaves
saveCollection = db.saves

class saveFile:
    def __init__(self, username):
        self.username = username
        self.saveString = ''

    def exists(self):
        if (saveCollection.find_one({'username': self.username}) == None):
            return False
        else:
            return True

    def postData(self):
        id = saveCollection.insert_one({
            "username" : self.username, 
            "saveFile" : self.saveString
            })

    def updateData(self):
        saveCollection.update_one({
            'username': self.username},{
            '$set': {'saveFile': self.saveString}
            })

    def getSaveFile(self):
        saveDoc = saveCollection.find_one({'username': self.username})
        self.saveString = saveDoc["saveFile"]
    
    def delete(self):
        if (saveCollection.find_one({'username': self.username}) != None):
            saveCollection.delete_one({'username': self.username})
        else: return False
    
    def refreshForNext(self):
        self.user_id = None
        self.saveString = None

# TODO clean up readability
# TODO make it work lmao

#call when savestring is passed from JS
def createSaveObject():
    bundledSave = request.json
    userName = bundledSave["userName"]
    del bundledSave["userName"]
    save = saveFile(userName)
    save.saveString = bundledSave
    return save
    
#call when only username is passed in body from JS
def getSaveObject():
    userName = request.json
    if debug:
        print(userName)
    save = saveFile(userName)
    return save

@app.route('/dbSave', methods=['POST', 'PUT', 'DELETE'])
def dbSave():

    #new save
    if (request.method == 'POST'):
        save = createSaveObject()
        if (save.exists()):
            serverResponse = 'username exists already!'
        else :
            save.postData()
            serverResponse = 'savefile created successfully!'
        save.refreshForNext()
        return jsonify(serverResponse)

    #update save
    if (request.method == 'PUT'):
        save = createSaveObject()
        serverResponse = 'no such savefile :(, try making one!'
        if (save.exists()):
            save.updateData()
            serverResponse = 'savefile updated successfully!'
        save.refreshForNext()
        return jsonify(serverResponse)

    #delete
    if (request.method == 'DELETE'):
        save = getSaveObject()
        serverResponse = 'savefile not found'
        if (save.exists()):
            save.delete()
            serverResponse = 'savefile deleted successfully'
        save.refreshForNext()
        return jsonify(serverResponse)

@app.route('/dbLoad', methods=['POST'])
def dbLoad():
    save = getSaveObject()
    if (save.exists()):
        save.getSaveFile()
        packagedSave = save.saveString
        save.refreshForNext()
        return  json.dumps(packagedSave)
    return 'no save found'

def unitTests():
    print("index info of saves: \n")
    print(saveCollection.index_information())
    print("connection status: \n")
    print(db.list_collections())

if debug:
    unitTests()
# TODO refactor to serve for prod instead of this
if __name__ == "__main__":
    app.run()