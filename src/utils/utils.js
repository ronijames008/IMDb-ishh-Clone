export const handleKeyDown = (event, fn) => {
    if (event.key === "Enter" || event.key === " ") {
        fn();
    }
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};