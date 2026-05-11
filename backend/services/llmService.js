require("dotenv").config();

const axios = require("axios");
const chrono = require("chrono-node");

const OLLAMA_URL = process.env.OLLAMA_URL;
const MODEL = process.env.OLLAMA_MODEL || "phi:latest";

// =====================================
// 🧠 MAIN NLP FUNCTION
// =====================================
async function parseInput(input) {

    try {

        if (!input || typeof input !== "string") {
            throw new Error("Invalid input");
        }

        const prompt = buildPrompt(input);

        const response = await axios.post(OLLAMA_URL, {

            model: MODEL,

            prompt: prompt,

            stream: false,

            options: {
                temperature: 0,
                top_p: 0.8,
                num_predict: 200
            }

        });

        if (
            !response ||
            !response.data ||
            !response.data.response
        ) {
            throw new Error("No response from LLM");
        }

        const rawOutput = response.data.response.trim();

        console.log("LLM RAW OUTPUT:\n", rawOutput);

        const parsedJSON = safeJSONParse(rawOutput);

        if (!parsedJSON) {
            throw new Error("Failed to parse JSON from LLM");
        }

        // =====================================
        // 📅 REAL DATE PARSING
        // =====================================

        const parsedDate = chrono.parseDate(input);

        if (parsedDate) {

            parsedJSON.date = parsedDate
                .toISOString()
                .split("T")[0];

        } else {

            parsedJSON.date = null;
        }

        applyDefaults(parsedJSON);

        validateLLMResponse(parsedJSON);

        return parsedJSON;

    } catch (err) {

        console.error("LLM Service Error:", err.message);

        throw new Error(
            err.message || "Failed to process input through LLM"
        );
    }
}

// =====================================
// 🧾 PROMPT TEMPLATE
// =====================================
function buildPrompt(input) {

    return `
You are a JSON API.

Convert the user request into STRICT VALID JSON.

RULES:
- RETURN ONLY JSON
- NO markdown
- NO explanation
- NO code block
- NO extra text
- DO NOT generate actual dates

SUPPORTED TYPES:
- create
- move
- update
- delete

JSON FORMAT:
{
  "type": "create",
  "id": null,
  "task": "string",
  "date": null,
  "time_preference": "morning | afternoon | evening | null",
  "priority": "low | mid | high",
  "constraints": [],
  "recurrence": "none | daily | weekly | monthly | yearly",
  "source": "llm"
}

USER INPUT:
"${input}"
`;
}

// =====================================
// 🛡️ SAFE JSON PARSER
// =====================================
function safeJSONParse(text) {

    try {

        const match = text.match(/\{[\s\S]*\}/);

        if (!match) {
            return null;
        }

        return JSON.parse(match[0]);

    } catch (err) {

        console.error("JSON Parse Error:", err.message);

        return null;
    }
}

// =====================================
// ✅ DEFAULT VALUES
// =====================================
function applyDefaults(json) {

    json.priority ||= "mid";

    json.constraints ||= [];

    json.recurrence ||= "none";

    json.source ||= "llm";
}

// =====================================
// ✅ VALIDATION
// =====================================
function validateLLMResponse(json) {

    if (!json.type) {
        throw new Error("Missing task type");
    }

    const allowedTypes = [
        "create",
        "move",
        "update",
        "delete"
    ];

    if (!allowedTypes.includes(json.type)) {
        throw new Error("Invalid task type");
    }

    if (
        json.priority &&
        !["low", "mid", "high"].includes(json.priority)
    ) {
        throw new Error("Invalid priority");
    }

    if (
        json.recurrence &&
        ![
            "none",
            "daily",
            "weekly",
            "monthly",
            "yearly"
        ].includes(json.recurrence)
    ) {
        throw new Error("Invalid recurrence");
    }
}

module.exports = {
    parseInput
};