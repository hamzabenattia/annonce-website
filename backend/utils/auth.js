const jwt = require('jsonwebtoken');

function generateToken(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET , {
    expiresIn: '7d',
  });


  res.cookie('token', token, { maxAge: 900000, httpOnly: true });
}



module.exports = generateToken;
