const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

// 📤 Upload new analytics JSON
router.post("/upload", upload.single("analytics"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  const tempPath = file.path;
  const targetPath = path.join(__dirname, "../data/analytics.json");

  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Failed to save file" });
    }

    res.json({ message: "Analytics data uploaded successfully" });
  });
});

// 📊 Fetch analytics data
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../data/analytics.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading analytics data:", err);
      return res.status(500).json({ error: "Failed to load analytics" });
    }

    res.json(JSON.parse(data));
  });
});

module.exports = router;
