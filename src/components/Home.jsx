import getBannerPosters from "../utils/getBannerPosters";
import Banner from "./Banner";
import { BannerContext } from "./Contexts";
import Movies from "./Movies";
import { useEffect, useState, useRef, useCallback } from "react";

function Home() {
  const [bannerPosters, setBannerPosters] = useState([]);
  const bl = bannerPosters.length;
  const [index, setIndex] = useState(0);
  const timeRef = useRef(null);

  const handleNextPoster = useCallback(() => {
    setIndex((index) => (index + 1) % bl);
  }, [bl]);
  const handlePrevPoster = useCallback(() => {
    setIndex(((index) => index - 1 + bl) % bl);
  }, [bl]);
  useEffect(() => {
    getBannerPosters()
      .then((popular) => {
        if (popular.results) {
          setBannerPosters(popular.results);
        }
      })
      .catch((err) => console.error(`ErrorMoviesBannerPoster ${err}`));
  }, []);

  useEffect(() => {
    timeRef.current = setInterval(() => {
      handleNextPoster();
    }, 5000);

    return () => {
      clearInterval(timeRef.current);
    };
  });

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
        value={{
          handleNextPoster,
          handlePrevPoster,
          index,
          bannerPosters,
        }}
      >
        <Banner />
      </BannerContext.Provider>
      <Movies />
    </div>
  );
}

export default Home;
