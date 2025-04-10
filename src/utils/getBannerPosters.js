import axios from "axios";
async function getBannerPosters() {
    const res = await axios.get("/.netlify/functions/getBannerPosters");
    return res.data;
}
export default getBannerPosters;