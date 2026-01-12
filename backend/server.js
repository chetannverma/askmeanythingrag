require("dotenv").config();
const express = require("express");
require("./db/mongo");

const askRoute = require("./routes/ask");
const feedbackRoute = require("./routes/feedback");

const app = express();
app.use(express.json());

app.use("/ask", askRoute);
app.use("/feedback", feedbackRoute);

app.listen(3001, () => console.log("Backend running on 3001"));
