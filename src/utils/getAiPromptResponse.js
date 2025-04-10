import axios from "axios";
async function getAiPromptResponse(prompt) {
    const res = await axios.get("/.netlify/functions/getAiPromptResponse", { params: { prompt } });
    // console.log("Response from Gemini:", res);
    return res.data;
}
export default getAiPromptResponse;  