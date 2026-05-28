const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "Bookmark routes working",
  });
});

module.exports = router;