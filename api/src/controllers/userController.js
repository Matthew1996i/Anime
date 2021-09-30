const { config } = require('../services/firebase');

const createUser = async (req, res) => {
  config.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.name,
  })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((error) => res.json(error));
};

module.exports = {
  createUser,
};
