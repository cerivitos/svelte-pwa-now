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
