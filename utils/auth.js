const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = { signToken };