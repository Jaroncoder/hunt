require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

// MongoDB connection URI from .env file
const uri = process.env.MONGO_URI;
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
const allowedOrigins = ['https://hunt-np1h.vercel.app/'];
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
}));

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Log the received data
    console.log('Received login request:', { username, password });

    try {
        // Find the user by username (email)
        const user = await credentialsCollection.findOne({ username: username });

        if (user) {
            // Compare stored password with the one provided by the user
            if (user.password === password) {
                res.status(200).json({ message: 'Login successful!' });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use PORT from .env
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
