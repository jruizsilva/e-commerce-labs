const {Router} = require('express')
const {signInUser, signUpUser, meUser} = require('../controllers/user.controller.js')
const router = Router()

router.post('/signup', signUpUser)
router.post('/signin', signInUser)
router.get('/me', meUser)

module.exports = router