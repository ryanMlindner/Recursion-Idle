from .databaseConnection import *
from .fileAccess import *

#test connections
saveCollection = db.saves
testFile = saveFile('flubber')
#TODO populate
#biggest workload to character ratio in a TODO ever

def unitTests():
    print("index info of saves: \n")
    print(saveCollection.index_information())