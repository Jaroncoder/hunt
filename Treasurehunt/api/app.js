const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON request bodies

// MongoDB connection URI
const uri = 'mongodb+srv://sample_user:sample123@cluster0.xig4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let credentialsCollection;

// Connect to MongoDB
client.connect()
    .then(() => {
        console.log('MongoDB connected successfully');
        const db = client.db('user_database'); // Your database name
        credentialsCollection = db.collection('credentials'); // Your credentials collection
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
