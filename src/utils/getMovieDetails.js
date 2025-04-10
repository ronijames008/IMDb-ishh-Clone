import axios from "axios";
async function getMovieDetails(title) {
    const res = await axios.get("/.netlify/functions/getMovieDetails", { params: { title } });
    // console.log("Response from TMDB:", res);
    return res.data;
}
export default getMovieDetails;  