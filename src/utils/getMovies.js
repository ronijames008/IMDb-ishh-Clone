import axios from "axios";
async function getMovies(page) {
    const res = await axios.get("/.netlify/functions/getMovies", {
        params: { page }
    });
    return res.data;
}
export default getMovies;  