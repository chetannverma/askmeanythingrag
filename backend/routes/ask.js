const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const QueryLog = require("../models/QueryLog");
const checkSafety = require("../safety/safetyFilter");
const { retrieve } = require("../rag/retriever");
const buildPrompt = require("../rag/promptBuilder");

const openai = new OpenAI();

router.post("/", async (req, res) => {
  const { query } = req.body;
  const safety = checkSafety(query);

  const retrieved = await retrieve(query);
  const prompt = buildPrompt(retrieved, query, safety.isUnsafe);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const answer = completion.choices[0].message.content;

  const log = await QueryLog.create({
    query,
    retrievedChunks: retrieved.map(r => r.chunkId),
    answer,
    isUnsafe: safety.isUnsafe,
    safetyReason: safety.reason
  });

  res.json({
    answer,
    sources: retrieved.map(r => r.title),
    isUnsafe: safety.isUnsafe,
    queryId: log._id
  });
});

module.exports = router;
