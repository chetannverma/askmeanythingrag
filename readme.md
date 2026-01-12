# Ask Me Anything – RAG-based Yoga & Wellness AI

## 1. Project Overview

**Ask Me Anything** is a full-stack AI micro-application built using a Retrieval-Augmented Generation (RAG) architecture to answer yoga and wellness-related queries in a safe, transparent, and explainable manner.

The application focuses on **backend-first AI engineering**, emphasizing:

* Correct RAG design (chunking, embeddings, retrieval)
* Backend safety logic for health-sensitive queries
* Structured logging and traceability using MongoDB
* Clear source attribution in the UI

The system is intentionally designed to avoid hallucinations and unsafe medical guidance, making it suitable for wellness-related use cases.

---

## 2. Architecture Overview

### High-Level Flow

```
User Query
   ↓
Safety Check (Keyword-based)
   ↓
Embedding Generation
   ↓
Vector Similarity Search (Top-K)
   ↓
Prompt Construction (Context + Rules)
   ↓
LLM Generation
   ↓
Response + Sources + Safety Flags
   ↓
MongoDB Logging
```

### Key Design Principles

* **Context-grounded answers only** (no free-form hallucination)
* **Safety-first responses** for health-related risks
* **Auditability** via query, context, and response logging

---

## 3. Tech Stack

### Frontend

* React (Web)
* Minimal UI focused on clarity and transparency

### Backend

* Node.js + Express
* Modular RAG pipeline
* Safety middleware

### Database

* MongoDB
* Stores queries, retrieved chunks, responses, safety flags, timestamps, and feedback

### Vector Store

* FAISS (local, in-memory for simplicity)

### AI Models

* OpenAI Embeddings (`text-embedding-3-small`)
* OpenAI Chat Model (`gpt-4o-mini`)

---

## 4. RAG Pipeline Design

### 4.1 Knowledge Chunking

Instead of naive fixed-size chunking, the knowledge base is chunked **semantically**:

* Each yoga article is split into logical sections such as:

  * Description
  * Benefits
  * Contraindications
  * Practice Tips

This approach:

* Improves retrieval accuracy
* Prevents cross-pose misinformation
* Enables clearer source attribution

### 4.2 Embeddings

* Each chunk is converted into a vector embedding
* Query embeddings are generated at runtime
* Cosine similarity is used to rank relevance

### 4.3 Retrieval

* Top 3–5 most relevant chunks are retrieved
* If similarity confidence is too low, the system gracefully declines to answer

### 4.4 Prompt Construction

The final prompt includes:

* Retrieved context only
* Clear system rules
* Safety instructions (if applicable)

This ensures that the LLM response remains grounded and cautious.

---

## 5. Safety Logic & Guardrails

Yoga and wellness advice can be risky in certain conditions. The backend implements a **mandatory safety layer**.

### 5.1 Safety Detection

Queries are flagged as unsafe if they include keywords related to:

* Pregnancy
* Medical conditions (e.g., hernia, glaucoma)
* Post-surgery recovery
* Chronic health issues

Detection is implemented using a simple keyword heuristic for clarity and explainability.

### 5.2 Unsafe Query Handling

When a query is flagged:

* `isUnsafe = true` is stored in MongoDB
* The response:

  * Displays a red warning banner in the UI
  * Provides only high-level, non-medical guidance
  * Suggests safer alternatives when possible
  * Advises consultation with a doctor or certified yoga therapist

⚠️ The system **never provides medical diagnoses or treatment instructions**.

---

## 6. API Design

### POST /ask

**Input**

```json
{ "query": "Is headstand safe during pregnancy?" }
```

**Output**

```json
{
  "answer": "This practice can be risky without professional supervision...",
  "sources": ["Contraindications of Inversions – Article 7"],
  "isUnsafe": true,
  "queryId": "65abc123"
}
```

### POST /feedback

**Input**

```json
{ "queryId": "65abc123", "helpful": true }
```

---

## 7. MongoDB Data Model

Each query is logged with full traceability:

```json
{
  "query": "Is headstand safe during pregnancy?",
  "retrievedChunks": ["article_7_contraindications"],
  "answer": "This practice can be risky...",
  "isUnsafe": true,
  "safetyReason": "pregnancy",
  "feedback": true,
  "timestamp": "2026-01-10T10:45:00Z"
}
```

This enables:

* Safety audits
* RAG performance evaluation
* Continuous system improvement

---

## 8. How to Run Locally

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Ensure MongoDB is running locally and `.env` is configured.

---

## 9. Known Limitations

* Safety detection uses keyword-based heuristics (can be upgraded to ML classifiers)
* Vector store is in-memory (can be persisted for scale)
* UI is intentionally minimal

---

## 10. Future Improvements

* Hybrid retrieval (keyword + vector search)
* Query rewriting for better recall
* LLM-based safety classification
* Admin dashboard for log analysis

---


## 11. Demo Video Guidelines

The demo video demonstrates:

1. A normal yoga-related query
2. An unsafe health-related query
3. Source attribution
4. MongoDB logs
5. Safety warning behavior

Duration: **2–5 minutes**

---

## 12. AI Tools & Prompts

If any AI-assisted IDE or tool is used, all prompts and usage details must be documented here for transparency and evaluation.

---

**End of README**
