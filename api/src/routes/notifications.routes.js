const { Router } = require('express')
const { getNotificationsByUserId, addNotification ,updateNotification} = require('../controllers/notifications.controller.js')

const router = Router()

router.post('/', addNotification);
router.get('/:userId', getNotificationsByUserId);
router.put('/', updateNotification);


module.exports = router;