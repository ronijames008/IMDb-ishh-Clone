import { useState, useEffect, useContext } from "react";
import { WatchlistContext } from "./Contexts";
import ScrollUp from "./ScrollUp";
import getGenres from "../utils/getGenres";

function Watchlist() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState({});
  const [currGenreSet, setCurrGenreSet] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {
    handleRemoveFromWatchlist,
    watchlist,
    handleSort,
    handleClearAllFromWatchlist,
  } = useContext(WatchlistContext);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClearWatchlist = () => {
    setShowConfirmModal(true);
  };

  const confirmClearWatchlist = () => {
    handleClearAllFromWatchlist();
    setShowConfirmModal(false);
  };

  const cancelClearWatchlist = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    getGenres()
      .then((result) => {
        if (result.genres) {
          setGenres(
            result.genres.reduce((acc, currItem) => {
              acc[currItem.id] = currItem.name;
              return acc;
            }, {}),
          );
        }
      })
      .catch((err) => {
        console.error(`Inside Watchlist ${err}`);
      });
  }, []);

  useEffect(() => {
    if (genres && Object.keys(genres).length > 0) {
      setCurrGenreSet([
        ...new Set(
          watchlist.map((obj) => genres?.[obj.genre_ids[0]] || "Unknown Genre"),
        ),
      ]);
    } else {
      setCurrGenreSet([]);
    }
  }, [watchlist, genres]);

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 md:py-8 lg:px-8 xl:px-10 xl:py-10">
      {/* Search Bar and Clear Button - Responsive width and padding */}
      <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:mb-5 sm:flex-row sm:gap-4 md:mb-6 lg:mb-8">
        <div className="relative mx-auto w-full max-w-md">
          <i className="fas fa-search absolute top-1/2 left-3 -translate-y-1/2 text-xs text-gray-700 sm:left-3.5 sm:text-sm md:left-4 md:text-base"></i>
          <input
            type="text"
            className="h-9 w-full rounded-md bg-white px-8 py-2 text-xs shadow-md focus:ring-2 focus:ring-[#F5C518] focus:outline-none sm:h-10 sm:text-sm md:h-11 md:px-10 md:py-3 md:text-base lg:h-12"
            onChange={handleSearch}
            placeholder="Search watchlist..."
            value={search}
            aria-label="Search watchlist"
          />
        </div>
      </div>

      {/* Genre Tabs - Responsive horizontal scrolling */}
      <div className="mb-4 overflow-x-auto sm:mb-6 md:mb-8">
        <div className="flex space-x-2 py-2 sm:space-x-3 md:space-x-4 lg:justify-center">
          {watchlist.length !== 0 &&
            ["All Genres", ...currGenreSet].map((obj) => {
              return (
                <div
                  onClick={() => {
                    setCurrGenre(obj);
                  }}
                  className={`rounded px-2 py-1 text-xs whitespace-nowrap transition duration-200 sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base lg:px-5 ${
                    currGenre == obj
                      ? "cursor-pointer bg-[#F5C518] font-semibold text-black"
                      : "cursor-pointer bg-gray-700 font-normal text-white hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-black"
                  }`}
                  key={obj}
                >
                  {obj}
                </div>
              );
            })}
        </div>
      </div>

      {/* Empty watchlist message */}
      {watchlist.length === 0 ? (
        <div className="mt-8 rounded-lg bg-gray-800 p-4 text-center text-white sm:p-6 md:p-8 lg:mt-10">
          <p className="text-base sm:text-lg md:text-xl">
            No movies in your watchlist.
          </p>
          {watchlist.length > 0 && (
            <p className="mt-2 text-sm text-gray-400 sm:text-base md:text-lg">
              Try adjusting your search or genre filter.
            </p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-white">
            <thead className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-xs sm:text-sm md:text-base">
              <tr>
                <th className="p-2 text-center sm:p-3 md:p-4">Name</th>
                <th className="p-2 sm:p-3 md:p-4">
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                    <i
                      onClick={() => {
                        handleSort("vote_average", "asc");
                      }}
                      className="fa-solid fa-caret-up cursor-pointer text-gray-700 hover:-translate-y-1 hover:text-[#F5C518]"
                    ></i>
                    <span>Ratings</span>
                    <i
                      onClick={() => {
                        handleSort("vote_average", "dsc");
                      }}
                      className="fa-solid fa-caret-down cursor-pointer text-gray-700 hover:translate-y-1 hover:text-[#F5C518]"
                    ></i>
                  </div>
                </th>
                <th className="p-2 sm:p-3 md:p-4">
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                    <i
                      onClick={() => {
                        handleSort("popularity", "asc");
                      }}
                      className="fa-solid fa-caret-up cursor-pointer text-gray-700 hover:-translate-y-1 hover:text-[#F5C518]"
                    ></i>
                    <span>Popularity</span>
                    <i
                      onClick={() => {
                        handleSort("popularity", "dsc");
                      }}
                      className="fa-solid fa-caret-down cursor-pointer text-gray-700 hover:translate-y-1 hover:text-[#F5C518]"
                    ></i>
                  </div>
                </th>
                <th className="p-2 text-center sm:p-3 md:p-4">Genre</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm md:text-base">
              {watchlist
                .slice()
                .reverse()
                .filter((obj) => {
                  return currGenre == "All Genres"
                    ? true
                    : genres[obj.genre_ids[0]] == currGenre;
                })
                .filter((obj) => {
                  return obj.title.toLowerCase().includes(search.toLowerCase());
                })
                .map((movieObj) => {
                  return (
                    <tr
                      key={movieObj.id}
                      className="relative border-b border-gray-700"
                    >
                      <td className="p-2 sm:p-3 md:p-4">
                        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
                          <div
                            className="h-12 w-20 flex-shrink-0 rounded bg-cover bg-center sm:h-16 sm:w-24 md:h-20 md:w-32 lg:h-24 lg:w-40"
                            style={{
                              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieObj.backdrop_path})`,
                            }}
                          ></div>
                          <span className="text-xs font-medium sm:text-sm md:text-base lg:text-lg">
                            {movieObj.title}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 text-center sm:p-3 md:p-4">
                        {Number(movieObj.vote_average.toFixed(1))}
                      </td>
                      <td className="p-2 text-center sm:p-3 md:p-4">
                        {movieObj.popularity.toFixed(1)}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4">
                        <div className="flex items-center justify-between">
                          <span>
                            {genres && genres[movieObj.genre_ids[0]]
                              ? genres[movieObj.genre_ids[0]]
                              : "Unknown Genre"}
                          </span>
                          <button
                            onClick={() => {
                              handleRemoveFromWatchlist(movieObj);
                            }}
                            className="ml-2 rounded p-1 text-gray-400 transition-colors duration-200 hover:text-red-500 sm:p-1.5 md:p-2"
                            aria-label="Remove from watchlist"
                          >
                            <i className="fa-solid fa-xmark cursor-pointer"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] p-4">
          <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-white">
              Clear Watchlist
            </h3>
            <p className="mb-6 text-gray-300">
              Are you sure you want to clear your entire watchlist? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelClearWatchlist}
                className="cursor-pointer rounded bg-gray-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearWatchlist}
                className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
                aria-label="Clear all"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
      {watchlist.length > 0 && (
        <div
          title="Clear Watchlist"
          className="fixed right-2 bottom-12 z-10 flex cursor-pointer items-center justify-center sm:right-4 sm:bottom-18 md:right-2 md:bottom-24 lg:right-2 lg:bottom-28 xl:right-8 xl:bottom-26"
          onClick={handleClearWatchlist}
          aria-label="Clear watchlist"
        >
          <div className="group relative flex items-center justify-center transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110">
            <i className="fa-solid fa-circle text-4xl text-red-600 group-hover:opacity-100 sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl xl:opacity-50"></i>
            <i className="fa-solid fa-trash-can absolute text-base text-white group-hover:opacity-100 sm:text-lg md:text-xl lg:text-2xl xl:text-2xl xl:opacity-50"></i>
          </div>
        </div>
      )}
      <ScrollUp />
    </div>
  );
}

export default Watchlist;
