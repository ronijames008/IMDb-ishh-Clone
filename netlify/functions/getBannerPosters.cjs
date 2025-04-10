const axios = require("axios");
require("dotenv").config();


async function handler(event, context) {
    const API_KEY = process.env.VITE_TMDB_API_KEY;

    try {
        const response = await axios
            .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
            );
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
                error: "Failed to fetch banner posters",
                details: err.message
            }),
        };
    }
}
module.exports = { handler };