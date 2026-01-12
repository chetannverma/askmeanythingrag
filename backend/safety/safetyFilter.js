const riskKeywords = [
  "pregnant", "pregnancy",
  "hernia", "glaucoma",
  "high blood pressure",
  "surgery", "post surgery"
];

function checkSafety(query) {
  const found = riskKeywords.find(k =>
    query.toLowerCase().includes(k)
  );

  return {
    isUnsafe: Boolean(found),
    reason: found || null
  };
}

module.exports = checkSafety;
