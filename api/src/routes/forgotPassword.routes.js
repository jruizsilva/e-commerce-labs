const { Router } = require('express');
const { changePassword } = require('../controllers/changePassword.controller');
const { forgotPassword } = require('../controllers/forgotPassword.controller');

const router = Router();

router.post("/", forgotPassword);
router.put("/", changePassword);

module.exports = router;