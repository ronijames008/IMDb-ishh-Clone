import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Watchlist from "./Components/Watchlist";
import { WatchlistContext } from "./Components/Contexts";
import { useEffect, useState } from "react";
import FindMovie from "./Components/FindMovie";
import MovieInfo from "./Components/MovieInfo"; // Import the new component

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [mounted, setMounted] = useState(false);

  const handleAddToWatchlist = (movieObj) => {
    setWatchlist([...watchlist, movieObj]);
  };

  const handleRemoveFromWatchlist = (movieObj) => {
    setWatchlist(watchlist.filter((obj) => obj.id !== movieObj.id));
  };

  const handleClearAllFromWatchlist = () => {
    setWatchlist([]);
  };

  const handleSort = (sortBy, order) => {
    let newWatchList = [...watchlist];
    if (order === "asc") {
      newWatchList.sort((a, b) => a[sortBy] - b[sortBy]);
    } else {
      newWatchList.sort((a, b) => b[sortBy] - a[sortBy]);
    }
    setWatchlist(newWatchList);
  };

  useEffect(() => {
    let watchlistfromLS = localStorage.getItem("watchlist");
    watchlistfromLS = JSON.parse(watchlistfromLS) || [];
    setWatchlist(watchlistfromLS);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist, mounted]);

  return (
    <BrowserRouter>
      <WatchlistContext.Provider
        value={{
          watchlist,
          handleAddToWatchlist,
          handleRemoveFromWatchlist,
          handleSort,
          handleClearAllFromWatchlist,
        }}
      >
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/find" element={<FindMovie />} />
            <Route path="/movie/:id" element={<MovieInfo />} />{" "}
            {/* Add new route */}
          </Routes>
        </div>
      </WatchlistContext.Provider>
    </BrowserRouter>
  );
}

export default App;
