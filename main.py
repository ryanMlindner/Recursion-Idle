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
        save = saveCollection.find_one({'username': self.username})
        self.username = save["username"]
        self.saveString = save["saveFile"]
    
    def delete(self):
        if (saveCollection.find_one({'username': self.username}) != None):
            saveCollection.delete_one({'username': self.username})
        else: return False
    
    def refreshForNext(self):
        self.user_id = None
        self.saveString = None

# TODO clean up readability
# TODO make it work lmao


@app.route('/dbConnect', methods=['GET', 'POST', 'PUT', 'DELETE'])
def dbConnect():

    #call when savestring is passed from JS
    def createSaveObject():
        bundledSaveUsername = request.json
        saveStringUsernameAppended = bundledSaveUsername.__str__()
        identifier = saveStringUsernameAppended.split(',', 1)
        userName = identifier[0]
        saveString = identifier[1]
        save = saveFile(userName)
        save.saveString = saveString
        return save
    
    #call when only username is passed in authorization from JS
    def getSaveObject():
        userName = request.authorization

        if debug:
            print(userName)
        
        save = saveFile(userName)
        save.getSaveFile()
        return save

    #load
    if (request.method == 'GET'):
        save = getSaveObject()
        save.getSaveFile()
        packagedSave = save.username + save.saveString
        save.refreshForNext()
        return  jsonify(packagedSave)

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
        if (save.exists()):
            save.updateData()
            serverResponse = 'savefile updated successfully'
        save.refreshForNext()
        return jsonify(serverResponse)

    #delete
    if (request.method == 'DELETE'):
        save = getSaveObject()
        if (save.exists()):
            save.delete()
            serverResponse = 'savefile deleted successfully'
        save.refreshForNext()
        return jsonify(serverResponse)

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