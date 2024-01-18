const jwt = require('jsonwebtoken');

function generateToken(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET , {
    expiresIn: '7d',
  });


  res.cookie('token', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite:"None", secure: true });
}



module.exports = generateToken;
