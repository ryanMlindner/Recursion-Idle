# containers to pass info in routes
# mapped to deconstruct/reconstruct savefiles in fileaccess
import json
from flask import request, jsonify, Flask
from .fileAccess import saveFile

debug = True

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