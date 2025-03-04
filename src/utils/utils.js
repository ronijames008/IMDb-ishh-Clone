export const handleKeyDown = (event, fn) => {
    if (event.key === "Enter" || event.key === " ") {
        fn();
    }
};