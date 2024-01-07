const jwt = require('jsonwebtoken');

function generateToken(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET , {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 86400000,

  });
}

module.exports = generateToken;
