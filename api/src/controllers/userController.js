const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const authConfig = require('../config/auth.json');

const User = require('../models/User');

const saltRounds = 10;

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    if (
      !name
      || !email
      || !password
      || password === ' '
      || password === undefined
      || password === null) return res.status(400).json({ message: 'Fields cannot be equal to empty or undefined' });

    const checkUser = await User.findOne({
      where: {
        email,
      },
    });

    if (checkUser) return res.status(200).json({ message: 'There is already a user for this email' });

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const dataUser = {
      name, email, password: hashPassword, emailverify: 0,
    };

    const user = await User.create(dataUser);

    return res.status(200).json({
      name: user.name,
      email: user.email,
      emailverify: user.emailverify,
    });
  },

  async UserLogin(req, res) {
    const { email, password } = req.body;

    const checkUser = await User.findOne({
      attributes: ['email', 'password', 'emailverify'],
      where: {
        email,
      },
    });

    if (!checkUser) return res.status(200).json({ message: 'User not found' });

    const istrue = bcrypt.compareSync(password, checkUser.password);

    if (!istrue) return res.status(200).json({ message: 'Incorrect password or email' });

    const token = generateToken({
      email: checkUser.email,
    });

    return res.status(200).json({ token });
  },

  async SendEmailPasswordRecovery(req, res) {
    const { email } = req.body;
    if (!email) return res.status(406).json({ message: 'email address not entered!' });

    const userFound = await User.findOne({
      attributes: ['email'],
      where: {
        email,
      },
    });

    if (!userFound) return res.status(404).json({ message: 'There is no user with the email entered' });

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.update({ passwordresettoken: token, passwordresetexpires: now }, {
      where: {
        email,
      },
    });

    now.setHours(now.getHours() - 3);

    return res.status(200).json({
      passwordresettoken: token,
      passwordresetexpires: now,
    });
  },

  async PasswordRecovery(req, res) {
    const { token, email, password } = req.body;

    if (!email) return res.status(401).json({ message: 'Email not informed' });

    const user = await User.findOne({
      attributes: ['passwordresetexpires', 'passwordresettoken'],
      where: {
        email,
      },
    });

    if (!user) return res.status(401).json({ message: 'invalid token' });

    if (!token) return res.status(401).json({ message: 'token not informed' });

    if (user.passwordresettoken !== token) return res.status(401).json({ message: 'Token does not match or poorly formatted' });

    const now = new Date();

    if (user.passwordresetexpires < now) return res.status(401).json({ message: 'token expired generate a new one' });

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    await User.update({ password: hashPassword }, {
      where: {
        email,
      },
    });

    return res.json({ message: 'password updated' });
  },
};
