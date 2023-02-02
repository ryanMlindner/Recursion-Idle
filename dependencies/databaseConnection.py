import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
#connectString = {{___DB_CONNECT_STRING___}}
MONGODB_URI = os.environ['MONGODB_URI']
# Connect to MongoDB cluster:
client = MongoClient(MONGODB_URI)
#database connection
db = client.idleSaves
