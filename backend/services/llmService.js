const axios = require("axios");

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "mistral";

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
                temperature: 0.1,
                top_p: 0.9
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

        const parsedJSON = safeJSONParse(rawOutput);

        if (!parsedJSON) {
            throw new Error("Failed to parse JSON from LLM");
        }

        validateLLMResponse(parsedJSON);

        return parsedJSON;

    } catch (err) {
        console.error("LLM Service Error:", err.message);

        throw new Error(
            err.message || "Failed to process input through LLM"
        );
    }
}

function buildPrompt(input) {
    return `
You are an intelligent task parsing AI.

Your ONLY job is to convert user input into valid JSON.

STRICT RULES:
- Return ONLY raw JSON
- No markdown
- No explanation
- No extra text
- No code blocks
- Always include all fields
- If field unavailable, use null or empty array

Supported types:
- create
- move
- update
- delete

JSON FORMAT:
{
  "type": "create",
  "id": null,
  "task": "string",
  "date": "YYYY-MM-DD",
  "time_preference": "morning | afternoon | evening | null",
  "priority": "low | mid | high",
  "constraints": [],
  "recurrence": "none | daily | weekly | monthly | yearly",
  "source": "llm"
}

EXAMPLES:

Input:
"Gym tomorrow morning"

Output:
{
  "type": "create",
  "id": null,
  "task": "Gym",
  "date": "2026-01-01",
  "time_preference": "morning",
  "priority": "mid",
  "constraints": [],
  "recurrence": "none",
  "source": "llm"
}

Input:
"Move gym to evening"

Output:
{
  "type": "move",
  "id": null,
  "task": "Gym",
  "date": null,
  "time_preference": "evening",
  "priority": "mid",
  "constraints": [],
  "recurrence": "none",
  "source": "llm"
}

USER INPUT:
"${input}"

OUTPUT:
`;
}

function safeJSONParse(text) {
    try {
        // Extract JSON object if extra text exists
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