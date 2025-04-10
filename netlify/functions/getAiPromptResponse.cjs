const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();


async function handler(event, context) {
    const API_KEY_2 = process.env.VITE_GEMINI_API_KEY;
    const prompt = event.queryStringParameters.prompt;
    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(`${API_KEY_2}`);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
        const result = await model.generateContent(prompt);
        return {
            statusCode: 200,
            body: JSON.stringify(
                result.response.text()
            ),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to fetch prompt response",
                details: err.message
            }),
        };
    }
}
module.exports = { handler };