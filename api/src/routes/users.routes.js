const { Router } = require('express')
const { googleAuth, getUser, signInUser, signUpUser } = require('../controllers/users.controller.js')
const router = Router()
router.post('/signup', signUpUser)
router.post('/signin', signInUser);
router.post('/googleAuth', googleAuth);
router.post('/user', getUser);

module.exports = router

