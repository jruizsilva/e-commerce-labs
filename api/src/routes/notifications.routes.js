const { Router } = require('express')
const { getNotificationsByUserId, addNotification ,updateNotification, updateNotificationByProduct} = require('../controllers/notifications.controller.js')

const router = Router()

router.post('/', addNotification);
router.get('/:userId', getNotificationsByUserId);
router.put('/', updateNotification);
router.put('/:notificationId', updateNotificationByProduct);


module.exports = router;