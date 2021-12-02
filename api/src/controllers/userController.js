const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    return res.status(200).json(user);
  },

  async UserLogin(req, res) {
    const { email, password } = req.body;

    const checkUser = await User.findOne({
      attributes: ['email', 'password', 'emailverify'],
      where: {
        email,
      },
    });

    if (!checkUser) return res.status(404).json({ message: 'User not found' });

    const istrue = bcrypt.compareSync(password, checkUser.password);

    if (!istrue) return res.status(200).json({ message: 'Incorrect password or username' });

    const token = generateToken({
      email: checkUser.email,
    });

    return res.status(200).json({ token });
  },
};
