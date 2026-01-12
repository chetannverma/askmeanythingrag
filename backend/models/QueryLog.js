const mongoose = require("mongoose");

const QueryLogSchema = new mongoose.Schema({
  query: String,
  retrievedChunks: Array,
  answer: String,
  isUnsafe: Boolean,
  safetyReason: String,
  feedback: Boolean,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QueryLog", QueryLogSchema);
