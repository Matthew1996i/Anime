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
  await config.auth().getUser(req.uuid)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((error) => res.json(error));
};

const UserLogin = async (req, res) => {
  const { uid } = req.body;

  res.send({
    token: generateToken({ id: uid }),
  });
};

module.exports = {
  createUser,
  getUser,
  UserLogin,
};
