const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.post('/register', [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('dob', 'Date of Birth is required and must be a valid date').isISO8601().toDate(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('confirmPassword', 'Confirm Password must be at least 6 characters').isLength({ min: 6 }),
    check('phone', 'Please include a valid phone number').isMobilePhone(),
    check('gender', 'Gender is required and must be either Male or Female').isIn(['Male', 'Female'])
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, dob, email, password, confirmPassword, phone, gender } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ errors: [{ msg: 'Passwords do not match' }] });
    }

    try {
        console.log("Checking if user exists");
        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists");
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        console.log("Creating new user");
        user = new User({
            firstName,
            lastName,
            dob,
            email,
            password,
            phone,
            gender
        });

        console.log("Hashing password");
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        console.log("Saving user to database");
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error("Error occurred:", err.message);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }

});
// Login Route
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Generate JWT token (this step requires adding JWT setup)
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
});


module.exports = router;
