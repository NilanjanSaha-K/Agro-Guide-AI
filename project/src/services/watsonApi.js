class WatsonAPIService {
  constructor() {
    this.apiKey = "TthtTOt24kKlxxq0gyiPoqFEiwabC_07DBXy65FJBK6o";
    this.tokenUrl = "https://iam.cloud.ibm.com/identity/token";
    this.streamUrl =
      "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/2ab48ea3-b259-4360-abfc-f663bf2e66b7/ai_service_stream?version=2021-05-01";
    this.token = null;
    this.tokenExpiry = null;
  }

  async getIAMToken() {
    try {
      const response = await fetch("http://localhost:8080/token"); // Use your relay URL here
      if (!response.ok) {
        const errorMsg = await response.text();
        console.error("Token relay fetch failed:", errorMsg);
        throw new Error("Failed to fetch token from relay");
      }
      const data = await response.json();
      this.token = data.access_token;
      this.tokenExpiry = Date.now() + 50 * 60 * 1000;
      return this.token;
    } catch (error) {
      console.error("❌ Error getting IAM token from relay:", error);
      throw error;
    }
  }


  async ensureValidToken() {
    if (!this.token || Date.now() > this.tokenExpiry) {
      await this.getIAMToken();
    }
    return this.token;
  }

  async sendMessage(message, onChunk = null) {
    try {
      const response = await fetch("http://localhost:8080/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("🔴 Backend responded with error:", errorText);
        throw new Error("Failed to contact backend message relay");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        const lines = chunkText.split("\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const data = line.slice(5).trim();
            if (data === "[DONE]") return assistantReply;

            try {
              const parsed = JSON.parse(data); // ✅ This now works correctly
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                assistantReply += delta;
                if (onChunk) onChunk(delta);
              }
            } catch (err) {
              console.warn("⚠️ Stream parse error:", err);
            }
          }
        }
      }

      return assistantReply;
    } catch (error) {
      console.error("❌ Error sending message through relay:", error);
      throw new Error("Failed to get response from AI assistant");
    }
  }

}

export const watsonAPI = new WatsonAPIService();
