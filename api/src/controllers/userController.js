const jwt = require('jsonwebtoken');
const { config } = require('../services/firebase');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

const createUser = async (req, res) => {
  const db = config.firestore();

  const userResp = await config.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.name,
  })
    .then((resp) => resp)
    .catch((error) => error);

  if (!userResp.uid) {
    return res.status(200).json(userResp);
  }

  try {
    db.collection('users').doc(userResp.uid).set({
      email: req.body.email,
      displayName: req.body.displayName,
      emailVerify: false,
    });

    return res.status(200).json({
      token: generateToken({ id: userResp.uid }),
    });
  } catch {
    return res.status(200).json({
      token: generateToken({ id: userResp.uid }),
      message: 'error creating anime list',
    });
  }
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
