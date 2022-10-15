const { Router, response } = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = Router();
const config = require('config');
const bcrypt = require('bcrypt');

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Invalid email...').isEmail(),
        check('password', 'invalid Password').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "invalid user's info on register..."
                });
            }
            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: "user already exist..." });
            }

            const hashedPassord = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassord });
            await user.save();
            res.status(201).json({ message: 'user created...' });


        } catch (e) {
            res.status(500).json({ message: "error" })
        }
    }
);


// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'invalid email...').normalizeEmail().isEmail(),
        check('password', 'invalid password...').exists()
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "invalid user's info on login..."
                });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'user not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'invalid Password...' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }

            );

            res.json({ token, userId: user.id });


        } catch (e) {
            res.status(500).json({ message: "error" })
        }
    }
);

module.exports = router;
