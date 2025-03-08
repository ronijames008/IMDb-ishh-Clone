import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Pagination from "./Pagination";
import ScrollUp from "./ScrollUp";
import { scrollToTop } from "../utils/utils";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`,
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((err) => {
        console.error(`Inside Movies API cannot be fetched. Error ${err}`);
      });
    scrollToTop();
  }, [page]);

  return (
    <>
      <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 lg:gap-5 xl:grid-cols-5 xl:gap-6">
        {movies.map((movieObj) => {
          return <Card key={movieObj.id} obj={movieObj} />;
        })}
        <ScrollUp />
      </div>
      <Pagination pgNo={page} prevFn={handlePrevious} nextFn={handleNext} />
    </>
  );
}

export default Movies;
