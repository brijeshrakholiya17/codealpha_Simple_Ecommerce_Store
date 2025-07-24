const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/userController'); // ✅ Real controller

router.post('/login', login);     // ✅ uses hashed password + JWT
router.post('/register', register);

module.exports = router;
