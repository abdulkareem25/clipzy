const express = require('express');
const { signUp } = require('../controllers/auth.controllers');

const router = express.Router();

router.post('/sign-up', signUp);

router.post('/sign-in', (req, res) => {
    res.status(200).json({
        message: "Sign in route is under construction."
    });
});

module.exports = router;