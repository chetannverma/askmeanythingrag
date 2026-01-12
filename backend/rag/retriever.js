const embedText = require("./embedder");

let VECTOR_STORE = []; // simple in-memory for demo

function loadVectors(chunks, embeddings) {
  VECTOR_STORE = chunks.map((c, i) => ({
    ...c,
    embedding: embeddings[i]
  }));
}

function cosineSim(a, b) {
  return a.reduce((sum, v, i) => sum + v * b[i], 0);
}

async function retrieve(query, k = 3) {
  const qEmbedding = await embedText(query);

  const scored = VECTOR_STORE.map(c => ({
    ...c,
    score: cosineSim(qEmbedding, c.embedding)
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

module.exports = { loadVectors, retrieve };
