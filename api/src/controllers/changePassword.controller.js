const { User } = require('../models');
const bcryptjs = require("bcryptjs");

const changePassword = async (req, res, next) => {

    const { password, token, userId } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 8);

    const updated = await User.update(
        {password: hashedPassword}, 
        {
            where: {
                id: userId
            }
        }
    );

    res.send(`Se actualizó ${updated} usuario`); // "Se acutalizó 1 usuario." (o 0 si falla)
}

module.exports = {
    changePassword
}