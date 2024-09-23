from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

client = MongoClient('mongodb+srv://sample_user:sample123@cluster0.xig4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.user_database

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    credentials_collection = db.credentials.find_one({'username': email})

    if credentials_collection and bcrypt.checkpw(password.encode('utf-8'), credentials_collection['password']):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials."}), 401

if __name__ == '__main__':
    app.run(debug=True)

client = MongoClient('mongodb+srv://sample_user:sample123@cluster0.xig4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.user_database

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    credentials_collection = db.credentials.find_one({'username': email})

    if credentials_collection and bcrypt.checkpw(password.encode('utf-8'), credentials_collection['password']):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials."}), 401

if __name__ == '__main__':
    app.run(debug=True)
