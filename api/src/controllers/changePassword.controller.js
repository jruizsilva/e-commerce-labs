const { User } = require("../models");
const bcryptjs = require("bcryptjs");

const changePassword = async (req, res, next) => {
  console.log("entre");

  const { password=null, token, userId } = req.body;

  let updated;
  if(password){
    const hashedPassword = await bcryptjs.hash(password, 8);
    updated = await User.update(
      { password: hashedPassword },
      {
        where: {
          id: userId,
        },
      }
    );
  }else{
    console.log("------------->>>>>>", userId);
    updated = await User.update(
      { state: "active" },
      {
        where: {
          id: userId,
        },
      }
    );
  }
  res.send(`Se actualizó ${updated} usuario`); // "Se acutalizó 1 usuario." (o 0 si falla)
};

module.exports = {
  changePassword,
};
