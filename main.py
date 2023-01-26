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

import datetime
import os
import pymongo
import json

import dependencies.databaseConnection
from dependencies.fileAccess import saveFile
from flask import Flask, jsonify, request, url_for, render_template
from dotenv import load_dotenv
from pymongo import MongoClient

debug = True

app = Flask(__name__,
            static_url_path='',
            static_folder='gameEngine/static',
            template_folder='gameEngine/templates')

#game view
@app.route('/')
def index():
    return render_template('index.html')

#call when savestring is passed from JS
def createSaveObject():
    bundledSave = list(json.loads(request.get_data(as_text= True)))
    userName = bundledSave[0]
    del bundledSave[0]
    save = saveFile(userName)
    save.saveString = bundledSave
    return save

#call when only username is passed in body from JS
def getSaveObject():
    userName = json.loads(request.get_data(as_text= True))
    if debug:
        #personal request from project manager
        print('yarp')
    save = saveFile(userName)
    return save

#define database access for everything except load
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

#define db access for load (workaround for not being able to send payload in GET)
@app.route('/dbLoad', methods=['POST'])
def dbLoad():
    save = getSaveObject()
    if (save.exists()):
        save.getSaveFile()
        packagedSave = save.saveString
        save.refreshForNext()
        return  json.dumps(packagedSave)
    return jsonify('savefile not found')

# TODO refactor to serve for prod instead of this
if __name__ == "__main__":
    app.run()