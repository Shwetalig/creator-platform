const Idea = require("../models/Idea");

const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { topic, niche } = req.body;

  const prompt = `You are a content strategist. Suggest one trending Instagram reel idea for a creator in the ${niche} niche about "${topic}". Include a reel idea, a hook, a caption, and 5 relevant hashtags.`;

  try {
    // MOCK response instead of calling OpenAI
    const text = `
Idea: Show a behind-the-scenes look at preparing a fitness shoot
Hook: “Ever wondered what it takes to nail a fitness reel?”
Caption: Raw prep, pure grind 💪 #BTS #FitnessLife
Hashtags: #fitnessreel #gymgrind #fitspiration #reelfitness #behindthescenes
`;

    console.log("🔍 Mocked Response:", text);

    // Basic parse (optional: improve based on formatting style)
    const ideaMatch = text.match(/(?:Idea|Reel Idea)[:\-]\s*(.+)/i);
    const hookMatch = text.match(/Hook[:\-]\s*(.+)/i);
    const captionMatch = text.match(/Caption[:\-]\s*(.+)/i);
    const hashtagsMatch = text.match(/Hashtags[:\-]\s*(.+)/i);

    const newIdea = new Idea({
      topic,
      niche,
      idea: ideaMatch?.[1],
      hook: hookMatch?.[1],
      caption: captionMatch?.[1],
      hashtags: hashtagsMatch?.[1]?.split(/[\s,]+/) || [],
    });

    await newIdea.save();

    res.json({
      idea: ideaMatch?.[1] || "No idea found",
      hook: hookMatch?.[1] || "No hook found",
      caption: captionMatch?.[1] || "No caption found",
      hashtags: hashtagsMatch?.[1]?.split(/[\s,]+/) || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate idea" });
  }

  router.get("/saved", async (req, res) => {
    try {
      const ideas = await Idea.find().sort({ createdAt: -1 });
      res.json(ideas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch ideas" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await Idea.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Idea not found" });
      res.json({ message: "Idea deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete idea" });
    }
  });
});

module.exports = router;
