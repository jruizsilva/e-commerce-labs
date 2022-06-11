const { Router } = require('express')
const { googleAuth, getUser, loginAuth } = require('../controllers/users.controller.js')
const router = Router()

router.post('/googleAuth', googleAuth);
router.post('/loginAuth', loginAuth);
router.post('/user', getUser);

module.exports = router

