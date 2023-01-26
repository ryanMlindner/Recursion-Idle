# server driver and API endpoints

import datetime
import os
import pymongo
import json

from dependencies.dbRouting import createSaveObject, getSaveObject
from flask import Flask, jsonify, request, url_for, render_template
from dotenv import load_dotenv

debug = True

app = Flask(__name__,
            static_url_path='',
            static_folder='gameEngine/static',
            template_folder='gameEngine/templates')

#game view
@app.route('/')
def index():
    return render_template('index.html')

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
    return jsonify('savefile not found')

# TODO refactor to serve for prod instead of this
if __name__ == "__main__":
    app.run()