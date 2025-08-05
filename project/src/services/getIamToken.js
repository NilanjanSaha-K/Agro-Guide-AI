const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const IBM_API_KEY = "TthtTOt24kKlxxq0gyiPoqFEiwabC_07DBXy65FJBK6o";
const STREAM_URL = "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/2ab48ea3-b259-4360-abfc-f663bf2e66b7/ai_service_stream?version=2021-05-01";

// Endpoint to get IAM token
app.get("/token", async (req, res) => {
  try {
    const response = await fetch("https://iam.cloud.ibm.com/identity/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        apikey: IBM_API_KEY,
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      }),
    });

    const data = await response.json();
    res.json({ access_token: data.access_token });
  } catch (err) {
    res.status(500).json({ error: "Token fetch failed", details: err.message });
  }
});

// Proxy endpoint to send message
const { Readable } = require("stream");

app.post("/message", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Get IAM token
    const tokenRes = await fetch("https://iam.cloud.ibm.com/identity/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        apikey: IBM_API_KEY,
        grant_type: "urn:ibm:params:oauth:grant-type:apikey"
      })
    });

    const { access_token } = await tokenRes.json();

    // Prepare request to Watsonx
    const watsonRes = await fetch(STREAM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      },
      body: JSON.stringify({
        messages: [{ content: userMessage, role: "user" }]
      })
    });

    if (!watsonRes.ok) {
      const errorBody = await watsonRes.text();
      console.error("Watson response error:", errorBody);
      return res.status(500).json({ error: "Watson API error", body: errorBody });
    }

    // Set headers to stream response to frontend
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Pipe Watson response stream to frontend
    watsonRes.body.on("data", chunk => {
      const lines = chunk.toString().split("\n");

      for (const line of lines) {
        if (line.startsWith("data:")) {
          const data = line.slice(5).trim();
          if (data === "[DONE]") {
            res.write(`data: [DONE]\n\n`);
            return;
          }
          res.write(`data: ${data}\n\n`);
        }
      }
    });

    watsonRes.body.on("end", () => {
      res.end();
    });

    watsonRes.body.on("error", (err) => {
      console.error("❌ Watson response stream error:", err);
      res.end();
    });

  } catch (err) {
    console.error("Message error:", err);
    res.status(500).json({ error: "Message processing failed" });
  }
});


app.listen(8080, () => console.log("✅ Relay server running on http://localhost:8080"));
