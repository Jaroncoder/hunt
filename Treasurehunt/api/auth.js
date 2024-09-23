const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB collection for credentials
const db = mongoose.connection;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection('credentials').findOne({ username: email });

        if (user && bcrypt.compareSync(password, user.password)) {
            return res.status(200).json({ message: 'Login successful!' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
