const { Router } = require('express')
const { getNotificationsById, postNotification ,updateNotification} = require('../controllers/notifications.controller.js')

const router = Router()

router.post('/', postNotification);
router.get('/:userId', getNotificationsById);
router.put('/', updateNotification);


module.exports = router;