const router = require("express").Router();

const Bookmark = require("../models/Bookmark");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE bookmark
router.post("/", authMiddleware, async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// GET all bookmarks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user._id,
    });

    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// GET one bookmark owned by logged-in user
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!bookmark) {
      return res.status(404).json({
        message: "Bookmark not found",
      });
    }

    res.json(bookmark);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// UPDATE bookmark owned by logged-in user
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true }
    );

    if (!updatedBookmark) {
      return res.status(404).json({
        message: "Bookmark not found",
      });
    }

    res.json(updatedBookmark);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// DELETE bookmark owned by logged-in user
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedBookmark) {
      return res.status(404).json({
        message: "Bookmark not found",
      });
    }

    res.json({
      message: "Bookmark deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;