const express = require("express");
const router = express.Router();
const QueryLog = require("../models/QueryLog");

router.post("/", async (req, res) => {
  const { queryId, helpful } = req.body;
  await QueryLog.findByIdAndUpdate(queryId, { feedback: helpful });
  res.json({ status: "ok" });
});

module.exports = router;
