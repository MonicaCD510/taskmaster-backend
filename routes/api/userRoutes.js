const router = require("express").Router();
const passport = require("passport");

const User = require("../../models/User");
const { signToken } = require("../../utils/auth");

// register user
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    const token = signToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user || !user.password) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const correctPassword = await user.comparePassword(req.body.password);

    if (!correctPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = signToken(user);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// start GitHub OAuth
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth callback
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    const token = signToken(req.user);

    res.json({
      message: "GitHub login successful",
      token,
      user: req.user,
    });
  }
);

module.exports = router;