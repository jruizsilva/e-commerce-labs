const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');

const CLIENT_ID = "804485400642-ql0oec6nnarp74n4keo22bq9ou539gme.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const googleAuth = async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });

    const { email } = ticket.getPayload();
    const user = await User.findOne({where: { email: email }});
    if (user.id) {
      const tokenJwt = jwt.sign(
        { user_id: user.id, email },
        "esteEsElSecret"
      );
      res.status(200).json({token: tokenJwt, user});
    }else{
      res.status(201).json({err: 'El usuario no esta registrado'});
    }

  } catch (error) {
    next(error);
  }
}

const loginAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({where: { email, password }});
    if (user) {
      const tokenJwt = jwt.sign(
        { user_id: user.id, email },
        "esteEsElSecret"
      );
      res.status(200).json({token: tokenJwt, user});
    }else{
      res.status(201).json({err: 'El usuario no existe'});
    }
  } catch (error) {
    next(error);
  }
}

const getUser = async (req, res, next) => {
  try {
    const { user_id, email } = jwt.verify(req.body.token, "esteEsElSecret");
    const user = await User.findOne({where: { id: user_id, email }});
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  googleAuth,
  getUser,
  loginAuth
}