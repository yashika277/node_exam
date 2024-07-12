const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');


/* ---------------------------- User registration --------------------------- */
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = new User({ username, password, role });
    await user.save();
    res.send('User registered successfully');
  } catch (err) {
    res.status(400).send(err);
  }
};

/* ------------------------------- User login ------------------------------- */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Username or password is wrong');

    const validPass = await user.comparePassword(password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id, role: user.role }, 'your_jwt_secret'); // Use your own secret
    res.cookie('token', token, { httpOnly: true });
    res.send('Logged in successfully');
  } catch (err) {
    res.status(400).send(err);
  }
};

/* ------------------------------- User logout ------------------------------ */
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.send('Logged out successfully');
};
