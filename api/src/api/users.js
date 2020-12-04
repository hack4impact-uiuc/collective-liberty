const router = require('express').Router;
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post('/deleteUser', async (req, res) => {
  const { email } = req;

  User.remove({ email });
});
