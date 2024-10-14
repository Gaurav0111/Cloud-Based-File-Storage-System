const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/User');

const registerUser = (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (row) return res.status(400).json({ error: 'Username already exists' });

        const hashedPassword = bcrypt.hashSync(password, 10);

        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            return res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(400).json({ error: 'Invalid username or password' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

        const token = jwt.sign(
            { user: { id: user.id, email: user.email } }, // Include the email in the JWT payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token });
    });
};

module.exports = { registerUser, loginUser };
