const { Notification } = require('../models/index.js');

const addNotification = async (req, res, next) => {
  const { userId, productId, message } = req.body;

  if (!userId || !productId || !message) return res.status(404);

  try {
     await Notification.create({
      userId,
      productId,
      message,
      state: true,
    });
    return res.status(200).send('ok');
  } catch (error) {
    next(error);
  }
};

const updateNotification = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await Notification.update({
      state: false},{
      where: {
        userId: userId,
      },
    });
    return res.status(200).send('ok');
  } catch (error) {
    next(error);
  }
};

const getNotificationsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const notification = await Notification.findAll({
      where: {
        userId: userId,
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(notification);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNotification,
  getNotificationsByUserId,
  updateNotification
};
