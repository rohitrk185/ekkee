import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Determine credentials path robustly
firebase_cred_env = os.environ.get("FIREBASE_CRED")
if firebase_cred_env and os.path.exists(firebase_cred_env):
    CRED_PATH = firebase_cred_env
else:
    CRED_PATH = "C:\\Users\\Logituit\\Desktop\\Eekee\\ekkee\\backend\\credentials.json"

if not firebase_admin._apps:
    cred = credentials.Certificate(CRED_PATH)
    firebase_admin.initialize_app(cred)

db = firestore.client() 