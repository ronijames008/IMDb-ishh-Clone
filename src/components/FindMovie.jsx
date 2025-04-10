import { useState, useContext } from "react";
import { WatchlistContext } from "./Contexts";
import getMovieDetails from "../utils/getMovieDetails";
import getAiPromptResponse from "../utils/getAiPromptResponse";

function FindMovie() {
  const { watchlist } = useContext(WatchlistContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieDetails = async (title) => {
    try {
      const response = await getMovieDetails(title);

      if (response.results && response.results.length > 0) {
        return response.results[0];
      }
      return null;
    } catch (error) {
      console.error(`Error fetching details for ${title}:`, error);
      return null;
    }
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      // Extract movie titles and genres from watchlist
      const watchlistTitles = watchlist.map((movie) => movie.title);
      const movieInfo = watchlist.map((movie) => ({
        title: movie.title,
        genre: movie.genre_ids ? movie.genre_ids.join(",") : "",
      }));

      // Prepare prompt for Gemini that explicitly excludes watchlist movies
      const prompt = `Based on these movies: ${JSON.stringify(movieInfo)}, recommend exactly 5 movies that are similar in style, tone, or genre. Important: Do NOT include any of these movies in your recommendations: ${watchlistTitles.join(", ")}. Return ONLY a JSON array of 5 movie titles, nothing else. Format example: ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]`;

      // Generate recommendations from Gemini
      const responseText = await getAiPromptResponse(prompt);
      // console.log("Response from Gemini:", responseText);

      // Parse the recommendations
      let recommendedMovies = [];
      try {
        // Extract JSON array if the response contains additional text
        const jsonMatch = responseText.match(/\[.*\]/s);
        if (jsonMatch) {
          recommendedMovies = JSON.parse(jsonMatch[0]);
        } else {
          recommendedMovies = JSON.parse(responseText);
        }

        // Ensure we have exactly 5 movies
        recommendedMovies = recommendedMovies.slice(0, 5);
      } catch (parseError) {
        console.error("Error parsing recommendations:", parseError);
        // Fallback: try to extract movie titles using regex
        const titleRegex = /"([^"]+)"/g;
        const matches = [...responseText.matchAll(titleRegex)];
        recommendedMovies = matches.slice(0, 5).map((match) => match[1]);
      }

      // Fetch movie details for each recommended movie
      const detailedRecommendations = await Promise.all(
        recommendedMovies.map(async (title) => {
          const details = await fetchMovieDetails(title);
          return (
            details || {
              title: title,
              poster_path: null,
              release_date: "Unknown",
              vote_average: 0,
              overview: "No overview available",
            }
          );
        }),
      );

      // Additional filter to ensure no watchlist movies appear in recommendations
      // This is a backup in case the AI didn't follow instructions perfectly
      const filteredRecommendations = detailedRecommendations.filter(
        (movie) => {
          // Check if this movie's ID is in the watchlist
          if (movie.id) {
            return !watchlist.some(
              (watchlistMovie) => watchlistMovie.id === movie.id,
            );
          }
          // For movies without IDs, filter by title
          return !watchlist.some(
            (watchlistMovie) =>
              watchlistMovie.title.toLowerCase() === movie.title.toLowerCase(),
          );
        },
      );

      // If we filtered out too many and now have less than 5, we could make another call
      // But for now, just display what we have
      setRecommendations(filteredRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:p-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
          Movie Recommendations
        </h2>

        {watchlist.length === 0 ? (
          <div className="rounded-lg bg-gray-800 p-6 text-center text-white">
            <p className="mb-4">
              Add some movies to your watchlist to get personalized
              recommendations.
            </p>
            <p className="text-gray-400">
              {
                "We'll analyze your taste in movies to find titles you might enjoy."
              }
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-center">
              <button
                onClick={getRecommendations}
                disabled={loading}
                className="focus:ring-opacity-50 transform rounded-sm bg-[#F5C518] px-6 py-2 font-bold text-black transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:cursor-pointer hover:bg-yellow-500 focus:ring-2 focus:ring-white focus:outline-none disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i> Finding
                    Movies...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <i className="fa-solid fa-film mr-2"></i> Find Me Movies!
                  </span>
                )}
              </button>
            </div>

            {error && (
              <div className="mb-6 rounded-md bg-red-900 p-4 text-white">
                <p>{error}</p>
              </div>
            )}

            {loading && (
              <div className="py-12 text-center text-white">
                <i className="fa-solid fa-spinner fa-spin mb-4 text-4xl text-[#F5C518]"></i>
                <p className="text-xl">Analyzing your taste in movies...</p>
              </div>
            )}

            {recommendations.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {recommendations.map((movie, index) => (
                    <div
                      key={index}
                      className="flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform duration-300"
                    >
                      <div className="relative aspect-[2/3] w-full flex-shrink-0">
                        {movie.poster_path ? (
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-700">
                            <i className="fa-solid fa-film text-4xl text-gray-500"></i>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="mb-2 flex items-baseline justify-between">
                          <h3
                            className="truncate text-lg font-semibold text-white"
                            title={movie.title}
                          >
                            {movie.title}
                          </h3>
                          <div className="flex items-center text-[#F5C518]">
                            <i className="fa-solid fa-star mr-1 text-xs"></i>
                            <span className="text-sm">
                              {movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                        <p className="mb-2 text-sm text-gray-400">
                          {movie.release_date
                            ? movie.release_date.substring(0, 4)
                            : "Unknown"}
                        </p>
                        <p className="line-clamp-3 flex-1 text-sm text-gray-300">
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {recommendations.length === 0 && !loading && (
                  <div className="rounded-lg bg-gray-800 py-8 text-center text-white">
                    <p>
                      No new recommendations found. Try adding more diverse
                      movies to your watchlist.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FindMovie;
