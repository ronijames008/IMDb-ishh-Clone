import axios from "axios";
async function getGenres() {
    const res = await axios.get("/.netlify/functions/getGenres");
    return res.data;
}
export default getGenres;  