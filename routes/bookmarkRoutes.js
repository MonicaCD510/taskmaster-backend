const router = require("express").Router();

const Bookmark = require("../models/Bookmark");

// CREATE bookmark
router.post("/", async (req, res) => {
  try {
    const bookmark = await Bookmark.create(req.body);

    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// GET all bookmarks
router.get("/", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();

    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// GET one bookmark
router.get("/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    res.json(bookmark);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// UPDATE bookmark
router.put("/:id", async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBookmark);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// DELETE bookmark
router.delete("/:id", async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);

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