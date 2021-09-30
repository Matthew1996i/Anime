const { config } = require('../services/firebase');

const createCollection = async (req, res) => {
  const db = config.firestore();

  const data = {
    name: req.body.name,
    email: req.body.email,
    emailVerify: req.body.emailVerify,
  };

  db.collection('users').doc(req.body.uuid).set({ ...data })
    .then((resp) => res.status(200).json(resp))
    .catch((error) => res.json(error));
};

module.exports = {
  createCollection,
};
