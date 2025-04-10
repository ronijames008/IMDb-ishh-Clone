const axios = require("axios");
require("dotenv").config();


async function handler(event, context) {
    const API_KEY = process.env.VITE_TMDB_API_KEY;
    const title = event.queryStringParameters.title;

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                title,
            )}&language=en-US&page=1`,
        );
        // console.log("Response from TMDB:", response);
        return {
            statusCode: 200,
            body: JSON.stringify(
                response.data
            ),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to fetch movie details",
                details: err.message
            }),
        };
    }
}
module.exports = { handler };