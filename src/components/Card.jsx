import { useContext } from "react";
import { WatchlistContext } from "./Contexts";

function Card({ obj }) {
  const year = obj.release_date.match(/^.{4}/)[0];
  const { handleAddToWatchlist, handleRemoveFromWatchlist, watchlist } =
    useContext(WatchlistContext);

  return (
    <div className="aspect-9/16 w-[75%]" title={obj.title}>
      <div
        // Movie Card Poster
        className="relative m-0 aspect-[2/3] w-full rounded-sm bg-cover bg-center p-0 sm:rounded md:rounded-md xl:rounded-md xl:text-3xl"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${obj.poster_path})`,
        }}
      >
        {/* Watchlist Bookmark */}
        {!watchlist.some((mobj) => {
          return obj.id === mobj.id;
        }) ? (
          <i
            // Black Ribbon
            onClick={() => handleAddToWatchlist(obj)}
            className="fa-solid fa-bookmark absolute right-1 text-base text-[rgba(55,65,81,0.6)] transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer sm:right-1.5 sm:text-lg md:right-2 md:text-xl lg:text-xl xl:right-3 xl:text-2xl"
            title="Add to Watchlist"
          >
            <i
              // white plus
              className="fa-solid fa-plus absolute inset-x-0 top-1/10 mx-auto text-center text-[0.5rem] sm:text-xs md:text-xs lg:text-sm xl:text-sm"
              style={{ color: "#ffffff" }}
            ></i>
          </i>
        ) : (
          <i
            // yellow ribbon
            onClick={() => handleRemoveFromWatchlist(obj)}
            className="fa-solid fa-bookmark absolute right-1 text-base transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer sm:right-1.5 sm:text-lg md:right-2 md:text-xl lg:text-xl xl:right-3 xl:text-2xl"
            style={{ color: "#F5C518" }}
            title="Remove from Watchlist"
          ></i>
        )}
      </div>
      {/* Movie Title, year, Ratings */}
      <div className="flex items-baseline justify-between text-white">
        <div className="max-w-[80%]">
          <h3 className="overflow-hidden text-xs font-normal overflow-ellipsis whitespace-nowrap sm:text-sm md:text-base lg:text-base xl:max-h-6 xl:max-w-40 xl:text-lg">
            {obj.title}
          </h3>
          <span className="text-xs text-gray-400 sm:text-xs md:text-sm xl:pr-1 xl:text-sm">
            {year}
          </span>
        </div>

        <span className="xl:text-md text-xs text-gray-300 sm:text-xs md:text-sm lg:text-base">
          {Number(obj.vote_average.toFixed(1))}
        </span>
      </div>
    </div>
  );
}

export default Card;
