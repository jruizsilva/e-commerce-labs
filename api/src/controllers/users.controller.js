const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const config = require('../utils/auth/index')
const { User } = require('../models/index.js');

const CLIENT_ID = "804485400642-ql0oec6nnarp74n4keo22bq9ou539gme.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const signUpUser = async (req, res, next) => {
  const {name, email, phone, address, password,role, state} = req.body
  try {
    const passwordHash = await bcryptjs.hash(password, 8)
      const user = await User.create({
          name,
          email,
          password: passwordHash,
          phone,
          address,
          role,
          state,
      })
      const token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 60 * 60 * 24
      })
      res.json({auth: 'true', token})
  } catch (error) {
      next(error)
  }
}

const signInUser = async (req, res, next) => {
  try {
    // email: pepe@gmail.com
    // password: 1234
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { 
        email,
      }
    });
    if (!user) {
      // el usuario  no existe
      return res.status(401).json({message: "The email doesn't exists"})
    }else{
      const validate = await bcryptjs.compare(password, user.password)
      console.log(validate)
      if(!validate){
        res.status(401).json({message: "Incorrect password"})
      }
      const token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 60 * 60 * 24
      })
      return res.json({message: 'signin', token})
    }
  } catch (error) {
    next(error);
  }
}

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

const meUser = (req, res, next) => {
  res.json('me')
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
  signUpUser,
  signInUser,
  googleAuth,
  getUser,
  meUser,
}