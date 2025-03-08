import { useState, useEffect } from "react";
import Logo from "../assets/imdbLs.svg";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Toggle side menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      const sideMenu = document.getElementById("side-menu");
      const hamburger = document.getElementById("hamburger-button");

      if (
        sideMenu &&
        !sideMenu.contains(event.target) &&
        hamburger &&
        !hamburger.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-black p-2 lg:p-3">
      {/* Logo with responsive sizing */}
      <img
        className="h-8 w-auto sm:h-10 md:h-12 lg:w-auto xl:w-[6%] xl:rounded-xs"
        src={Logo}
        alt="IMDb Logo"
      />

      {/* Hamburger menu for mobile */}
      <button
        id="hamburger-button"
        className="z-30 block p-2 text-white lg:hidden"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? (
          <i className="fa-solid fa-times text-xl sm:text-2xl"></i>
        ) : (
          <i className="fa-solid fa-bars text-xl sm:text-2xl"></i>
        )}
      </button>

      {/* Desktop navigation links */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:font-normal lg:text-white">
        <Link
          className="p-1 text-base transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[hsl(47,92%,53%)] focus-visible:ring-offset-2 focus-visible:outline-none lg:mx-4 xl:mx-6 xl:text-4xl"
          to="/"
        >
          Home
        </Link>
        <Link
          className="p-1 text-base transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[hsl(47,92%,53%)] focus-visible:ring-offset-2 focus-visible:outline-none md:mx-4 lg:mx-6 lg:text-xl xl:mx-8 xl:text-4xl"
          to="/watchlist"
        >
          Watchlist
        </Link>
        <Link
          className="p-1 text-base transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[hsl(47,92%,53%)] focus-visible:ring-offset-2 focus-visible:outline-none md:mx-4 lg:mx-6 lg:text-xl xl:mx-8 xl:text-4xl"
          to="/find"
        >
          Find Me a Movie!
        </Link>
      </div>

      {/* Side menu overlay - shown when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)]" />
      )}

      {/* Side menu for mobile */}
      <div
        id="side-menu"
        className={`fixed top-0 right-0 z-30 h-full w-64 transform bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Side menu header with close button */}
          <div className="border-b border-gray-700 p-4 px-6">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Close menu"
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>

          {/* Side menu links */}
          <div className="flex flex-col p-4">
            <Link
              className="mb-4 flex items-center p-2 text-lg text-white"
              to="/"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-home mr-2"></i>
              Home
            </Link>
            <Link
              className="mb-4 flex items-center p-2 text-lg text-white"
              to="/watchlist"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-bookmark mr-3 ml-0.5"></i>
              Watchlist
            </Link>
            <Link
              className="flex items-center p-2 text-lg text-white"
              to="/find"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-film mr-3"></i>
              Find Me a Movie!
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
