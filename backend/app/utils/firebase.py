import firebase_admin
from firebase_admin import credentials, firestore
import os

# Path to your service account key
CRED_PATH = "D:\\ekkee\\backend\\credentials.json";

if not firebase_admin._apps:
    cred = credentials.Certificate(CRED_PATH)
    firebase_admin.initialize_app(cred)

db = firestore.client() 