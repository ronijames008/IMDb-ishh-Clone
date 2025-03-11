import { scrollToTop } from "../utils/utils";

function ScrollUp() {
  // scrollToTop();
  return (
    <button
      aria-label="Scroll up"
      title="All the way up!!"
      onClick={scrollToTop}
      className="fixed right-2 bottom-0.5 z-50 cursor-pointer sm:right-4 sm:bottom-4 md:right-2 md:bottom-4 lg:right-2 lg:bottom-4 xl:right-8 xl:bottom-8"
    >
      <i className="fa-solid fa-circle-chevron-up text-4xl text-[#F5C518] transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:opacity-100 sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl xl:opacity-50"></i>
    </button>
  );
}

export default ScrollUp;
