import { handleKeyDown } from "../utils/utils";
function Pagination({ pgNo, prevFn, nextFn }) {
  return (
    <div className="flex w-full items-center justify-center py-2 text-white sm:py-3 md:py-4 lg:py-5 xl:py-6">
      <div className="flex items-center rounded-lg bg-gray-800/50 px-2 shadow-md sm:px-3 md:px-4">
        <button
          onClick={prevFn}
          onKeyDown={(event) => handleKeyDown(event, prevFn)}
          disabled={pgNo <= 1}
          tabIndex={0}
          aria-label="Previous Page"
          className="flex cursor-pointer items-center justify-center rounded p-2 text-xs transition duration-200 ease-in-out hover:-translate-x-1 hover:scale-110 hover:text-[#F5C518] focus-visible:ring-2 focus-visible:ring-[#F5C518] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:scale-100 disabled:hover:text-white sm:p-2 sm:text-sm md:p-2.5 md:text-base lg:p-3 lg:text-lg"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span className="ml-1 hidden md:inline">Previous</span>
        </button>

        <div className="mx-3 flex items-center justify-center rounded-md bg-gray-700/70 px-3 py-1 font-medium sm:mx-4 sm:px-4 md:mx-5 md:px-5 lg:mx-6 lg:px-6">
          <span className="mr-1 hidden cursor-default sm:inline">Page</span>
          <span className="cursor-default text-xs sm:text-sm md:text-base lg:text-lg">
            {pgNo}
          </span>
        </div>

        <button
          onClick={nextFn}
          onKeyDown={(event) => handleKeyDown(event, nextFn)}
          tabIndex={0}
          aria-label="Next Page"
          className="flex cursor-pointer items-center justify-center rounded p-2 text-xs transition duration-200 ease-in-out hover:translate-x-1 hover:scale-110 hover:text-[#F5C518] focus-visible:ring-2 focus-visible:ring-[#F5C518] focus-visible:ring-offset-2 focus-visible:outline-none sm:p-2 sm:text-sm md:p-2.5 md:text-base lg:p-3 lg:text-lg"
        >
          <span className="mr-1 hidden md:inline">Next</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
