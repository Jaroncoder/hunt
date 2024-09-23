require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

const uri = process.env.MONGO_URI; // Use the MONGO_URI from .env
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let credentialsCollection;

// Connect to MongoDB
client.connect()
    .then(() => {
        console.log('MongoDB connected successfully');
        const db = client.db('user_database');
        credentialsCollection = db.collection('credentials');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// CORS Configuration
const allowedOrigins = ['https://hunt-np1h.vercel.app'];
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Your login route and other code here...

const PORT = process.env.PORT || 5000; // Use PORT from .env
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
