function buildPrompt(contextChunks, query, isUnsafe) {
  let context = contextChunks.map(c => c.text).join("\n");

  let safetyNote = isUnsafe
    ? "⚠️ This question involves health risks. Provide only general guidance and include a warning."
    : "";

  return `
You are a yoga assistant.
Use ONLY the context below.

Context:
${context}

${safetyNote}

Question: ${query}
Answer carefully:
`;
}

module.exports = buildPrompt;
