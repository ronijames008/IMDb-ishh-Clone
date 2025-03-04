import { useContext } from "react";
import { BannerContext } from "./Contexts";
import { handleKeyDown } from "../utils/utils";

function Banner() {
  const { handleNextPoster, handlePrevPoster, index, bannerPosters } =
    useContext(BannerContext);
  return (
    <div className="flex w-full items-center justify-between p-4 sm:py-5 md:px-6 lg:px-8 xl:h-[80vh] xl:px-10 xl:py-5">
      {/* Left Arrow */}
      <button
        className="rounded-s-md bg-[rgba(55,65,81,0.2)] p-1 text-sm text-gray-200 transition delay-50 duration-200 ease-in-out hover:-translate-x-1.5 hover:scale-110 hover:cursor-pointer hover:text-[#F5C518] focus-visible:ring-2 focus-visible:ring-[hsl(47,92%,53%)] focus-visible:ring-offset-2 focus-visible:outline-none sm:p-1.5 sm:text-base md:p-2 md:text-lg lg:text-xl xl:rounded-s-lg xl:p-2 xl:text-3xl"
        aria-label="Previous movie"
        onClick={handlePrevPoster}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Banner Content */}
      <div className="mx-3 flex w-full flex-col justify-center rounded-md bg-[rgba(0,0,0,0.6)] p-4 sm:mx-4 sm:w-1/2 sm:p-5 md:mx-5 md:w-1/2 md:p-6 lg:w-1/3 lg:p-7 xl:mr-auto xl:mb-1 xl:ml-5 xl:h-[40vh] xl:w-1/2 xl:self-end xl:rounded-xl xl:p-8">
        {/* Popular Tag */}
        <div
          style={{ color: "#F5C518" }}
          className="fa-fade text-xs font-medium sm:text-sm md:text-base lg:text-lg xl:text-xl"
        >
          <i className="fa-solid fa-fire mr-0.5"></i>Popular
        </div>

        {/* Movie Title */}
        <div className="mt-1 text-xl font-bold text-white sm:mt-2 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          {bannerPosters[index] && bannerPosters[index].title}
        </div>

        {/* Movie Overview */}
        <div className="mt-2 line-clamp-2 overflow-hidden text-xs tracking-tighter overflow-ellipsis text-gray-200 sm:mt-3 sm:line-clamp-3 sm:text-xs md:mt-4 md:text-sm lg:text-base xl:mt-6.5 xl:text-lg">
          {bannerPosters[index] && bannerPosters[index].overview}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        className="rounded-e-md bg-[rgba(55,65,81,0.2)] p-1 text-sm text-gray-200 transition delay-50 duration-200 ease-in-out hover:translate-x-1.5 hover:scale-110 hover:cursor-pointer hover:text-[#F5C518] focus-visible:ring-2 focus-visible:ring-[hsl(47,92%,53%)] focus-visible:ring-offset-2 focus-visible:outline-none sm:p-1.5 sm:text-base md:p-2 md:text-lg lg:text-xl xl:rounded-e-lg xl:p-2 xl:text-3xl"
        aria-label="Next movie"
        onClick={handleNextPoster}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default Banner;
