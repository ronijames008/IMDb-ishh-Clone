import "./App.css";
import Watchlist from "./components/Watchlist";
import FindMovie from "./components/FindMovie";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import { WatchlistContext } from "./components/Contexts";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleSort = (criteria, sort) => {
    const sortedWatchlist = [...watchlist].sort((a, b) => {
      if (sort === "asc") {
        return a[criteria] - b[criteria];
      } else {
        return b[criteria] - a[criteria];
      }
    });
    setWatchlist(sortedWatchlist);
  };

  const handleRemoveFromWatchlist = (movieObj) => {
    let updatedWatchlist = watchlist.filter((obj) => {
      return obj.id !== movieObj.id;
    });
    setWatchlist(updatedWatchlist);
    localStorage.setItem("movies", JSON.stringify(updatedWatchlist));
  };

  const handleAddToWatchlist = (movieObj) => {
    if (
      !watchlist.some((obj) => {
        return obj.id === movieObj.id;
      })
    ) {
      let updatedWatchlist = [...watchlist, movieObj];
      setWatchlist(updatedWatchlist);
      localStorage.setItem("movies", JSON.stringify(updatedWatchlist));
    }
  };

  const handleClearAllFromWatchlist = () => {
    setWatchlist([]);
  };

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies"));
    if (storedMovies) {
      setWatchlist(storedMovies);
    }
  }, []);

  return (
    <>
      <WatchlistContext.Provider
        value={{
          handleAddToWatchlist,
          handleRemoveFromWatchlist,
          watchlist,
          handleSort,
          handleClearAllFromWatchlist,
        }}
      >
        <BrowserRouter>
          <div className="flex min-h-screen flex-col bg-gray-900">
            <Navbar />
            <div className="flex-grow pt-14 sm:pt-14 md:pt-16 lg:pt-16 xl:pt-16">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Home />
                    </>
                  }
                />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/find" element={<FindMovie />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </WatchlistContext.Provider>
    </>
  );
}

export default App;
