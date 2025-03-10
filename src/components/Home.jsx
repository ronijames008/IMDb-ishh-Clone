import Banner from "./Banner";
import { BannerContext } from "./Contexts";
import Movies from "./Movies";
import axios from "axios";
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  const [bannerPosters, setBannerPosters] = useState([]);

  const [index, setIndex] = useState(0);

  const handleNextPoster = () => {
    index < bannerPosters.length - 1 && setIndex(index + 1);
  };
  const handlePrevPoster = () => {
    index > 0 && setIndex(index - 1);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      )
      .then((popular) => {
        if (popular.data.results) {
          setBannerPosters(popular.data.results);
        }
      })
      .catch((err) => console.error(`ErrorMoviesBannerPoster ${err}`));
  }, []);

  return (
    <div
      className="w-screen bg-contain bg-no-repeat"
      style={{
        backgroundImage: bannerPosters[index]
          ? `url(https://image.tmdb.org/t/p/original${bannerPosters[index].backdrop_path}), linear-gradient(to right, #111827, #1F2937, #000000)`
          : "none",
      }}
    >
      <BannerContext.Provider
        value={{ handleNextPoster, handlePrevPoster, index, bannerPosters }}
      >
        <Banner />
      </BannerContext.Provider>
      <Movies />
    </div>
  );
}

export default Home;
