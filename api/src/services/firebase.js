const admin = require('firebase-admin');
const serviceAccont = require('./serviceaccont.json');

const config = admin.initializeApp({
  credential: admin.credential.cert(serviceAccont),
});

module.exports = {
  config,
};
