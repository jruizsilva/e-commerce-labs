const { Router } = require('express');
const { forgotPassword } = require('../controllers/forgotPassword.controller');
const router = Router();

router.post("/", forgotPassword);

module.exports = router;