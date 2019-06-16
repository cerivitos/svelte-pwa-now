export function debounce(delay, fn) {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

export const ratingColors = [
  "-red-400",
  "-orange-400",
  "-orange-400",
  "-green-400",
  "-green-500",
  "-teal-400"
];

export const ratingBackgroundRgba = [
  "rgba(252, 129, 129, 0.2)",
  "rgba(246, 173, 85, 0.2)",
  "rgba(246, 173, 85, 0.2)",
  "rgba(104, 211, 145, 0.2)",
  "rgba(72, 187, 120, 0.2)",
  "rgba(79, 209, 197, 0.2)"
];
