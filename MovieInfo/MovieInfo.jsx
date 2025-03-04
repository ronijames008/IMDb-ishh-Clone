import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { WatchlistContext } from "./Contexts";
import ScrollUp from "./ScrollUp";

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [genres, setGenres] = useState([]);
  const [similar, setSimilar] = useState([]);
  const { handleAddToWatchlist, handleRemoveFromWatchlist, watchlist } =
    useContext(WatchlistContext);

  const isInWatchlist =
    movie && watchlist.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fetch movie details
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=bff2b86ea037d99d01532d860b4d4924&language=en-US`,
        );

        setMovie(movieResponse.data);
        setGenres(movieResponse.data.genres);

        // Fetch movie credits for cast and director
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bff2b86ea037d99d01532d860b4d4924&language=en-US`,
        );

        // Get top cast members
        setCast(creditsResponse.data.cast.slice(0, 6));

        // Find director(s)
        const directors = creditsResponse.data.crew.filter(
          (person) => person.job === "Director",
        );
        setDirector(directors.length > 0 ? directors[0] : null);

        // Fetch similar movies
        const similarResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=bff2b86ea037d99d01532d860b4d4924&language=en-US&page=1`,
        );

        setSimilar(similarResponse.data.results.slice(0, 5));
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      handleRemoveFromWatchlist(movie);
    } else {
      // Ensure the movie object has the required fields for the watchlist
      const watchlistMovie = {
        ...movie,
        genre_ids: movie.genres.map((genre) => genre.id),
      };
      handleAddToWatchlist(watchlistMovie);
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-[#F5C518]"></i>
          <p className="mt-4 text-white">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md rounded-lg bg-gray-800 p-6 text-center text-white">
          <i className="fa-solid fa-circle-exclamation mb-4 text-4xl text-red-500"></i>
          <p className="text-xl font-bold">Something went wrong</p>
          <p className="mt-2 text-gray-300">{error}</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded bg-[#F5C518] px-4 py-2 font-bold text-black hover:bg-yellow-500"
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero backdrop */}
      {backdropUrl && (
        <div
          className="relative h-[40vh] w-full bg-cover bg-center md:h-[50vh] lg:h-[60vh]"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(17,24,39,1)), url(${backdropUrl})`,
          }}
        >
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent pt-24 pb-10">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mt-2 text-lg text-gray-300 italic">
                  {movie.tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left column - Poster and watch button */}
          <div className="mb-6 md:mb-0 md:w-1/3 lg:w-1/4">
            {posterUrl ? (
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
                <img
                  src={posterUrl}
                  alt={`${movie.title} poster`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-gray-800 shadow-lg">
                <i className="fa-solid fa-film text-4xl text-gray-500"></i>
              </div>
            )}

            {/* Watchlist button */}
            <button
              onClick={handleWatchlistToggle}
              className={`mt-4 flex w-full items-center justify-center rounded-md px-4 py-3 font-bold transition duration-200 ease-in-out ${
                isInWatchlist
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-[#F5C518] text-black hover:bg-yellow-500"
              }`}
            >
              <i
                className={`fa-solid fa-bookmark mr-2 ${isInWatchlist ? "text-[#F5C518]" : ""}`}
              ></i>
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>

          {/* Right column - Details */}
          <div className="md:w-2/3 lg:w-3/4">
            {/* Key details */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-300 md:text-base">
              <span className="flex items-center rounded bg-[#F5C518] px-2 py-1 font-bold text-black">
                <i className="fa-solid fa-star mr-1"></i>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>

              {movie.release_date && (
                <span>{new Date(movie.release_date).getFullYear()}</span>
              )}

              {movie.runtime > 0 && <span>{formatRuntime(movie.runtime)}</span>}

              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-gray-700 px-3 py-1"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">
                Overview
              </h2>
              <p className="text-gray-300">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Additional details */}
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {director && (
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    Director
                  </h3>
                  <p className="text-gray-300">{director.name}</p>
                </div>
              )}

              {movie.status && (
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    Status
                  </h3>
                  <p className="text-gray-300">{movie.status}</p>
                </div>
              )}

              {movie.budget > 0 && (
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    Budget
                  </h3>
                  <p className="text-gray-300">
                    ${movie.budget.toLocaleString()}
                  </p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    Revenue
                  </h3>
                  <p className="text-gray-300">
                    ${movie.revenue.toLocaleString()}
                  </p>
                </div>
              )}

              {movie.production_companies &&
                movie.production_companies.length > 0 && (
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      Production
                    </h3>
                    <p className="text-gray-300">
                      {movie.production_companies
                        .slice(0, 2)
                        .map((company) => company.name)
                        .join(", ")}
                      {movie.production_companies.length > 2 && ", ..."}
                    </p>
                  </div>
                )}
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">
                  Top Cast
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  {cast.map((person) => (
                    <div key={person.id} className="text-center">
                      <div className="mx-auto aspect-square h-24 w-24 overflow-hidden rounded-full bg-gray-800 sm:h-28 sm:w-28 md:h-32 md:w-32">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            alt={person.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <i className="fa-solid fa-user text-2xl text-gray-600"></i>
                          </div>
                        )}
                      </div>
                      <h3 className="mt-2 font-medium text-white">
                        {person.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {person.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Movies */}
            {similar.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">
                  Similar Movies
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {similar.map((similarMovie) => (
                    <Link
                      to={`/movie/${similarMovie.id}`}
                      key={similarMovie.id}
                      className="transition duration-200 ease-in-out hover:opacity-80"
                    >
                      <div className="overflow-hidden rounded-lg bg-gray-800">
                        <div className="relative aspect-[2/3]">
                          {similarMovie.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                              alt={similarMovie.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <i className="fa-solid fa-film text-2xl text-gray-600"></i>
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <h3 className="truncate text-sm font-medium text-white">
                            {similarMovie.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-400">
                            <i className="fa-solid fa-star mr-1 text-[#F5C518]"></i>
                            {similarMovie.vote_average.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollUp />
    </div>
  );
}

export default MovieInfo;
