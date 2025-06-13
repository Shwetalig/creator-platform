const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  topic: String,
  niche: String,
  idea: String,
  hook: String,
  caption: String,
  hashtags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Idea", IdeaSchema);
