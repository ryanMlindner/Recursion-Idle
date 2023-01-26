from .databaseConnection import db
saveCollection = db.saves

class saveFile:
    def __init__(self, username):
        self.username = username
        self.saveString = ''

    def exists(self):
        if (saveCollection.find_one({"username": self.username}) == None):
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