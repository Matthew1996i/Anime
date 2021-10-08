const jwt = require('jsonwebtoken');
const { config } = require('../services/firebase');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

const createUser = async (req, res) => {
  config.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.name,
  })
    .then((resp) => {
      res.status(200).json({
        token: generateToken({ id: resp.uid }),
      });
    })
    .catch((error) => res.json(error));
};

const getUser = async (req, res) => {
  const { message, uuid } = req;
  await config.auth().getUser(uuid)
    .then((resp) => {
      const newResp = {
        ...resp,
        message,
      };
      res.status(200).json(newResp);
    })
    .catch((error) => res.json(error));
};

const UserLogin = async (req, res) => {
  const { uid } = req.body.data;

  if (!uid) {
    return res.send({
      errorCode: 'auth/uid-uninformed',
    });
  }

  return res.send({
    token: generateToken({ id: uid }),
  });
};

module.exports = {
  createUser,
  getUser,
  UserLogin,
};
