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

//From https://www.geodatasource.com/developers/javascript
export function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

//From https://stackoverflow.com/questions/37269764/check-if-marker-is-in-view-map-mapbox
export function inBounds(point, bounds) {
  var lng = (point.lng - bounds._ne.lng) * (point.lng - bounds._sw.lng) < 0;
  var lat = (point.lat - bounds._ne.lat) * (point.lat - bounds._sw.lat) < 0;
  return lng && lat;
}

export const ratingColors = [
  "rgba(252, 129, 129, 1.0)",
  "rgba(246, 173, 85, 1.0)",
  "rgba(246, 173, 85, 1.0)",
  "rgba(104, 211, 145, 1.0)",
  "rgba(72, 187, 120, 1.0)",
  "rgba(79, 209, 197, 1.0)"
];

export const ratingBackgroundRgba = [
  "rgba(252, 129, 129, 0.2)",
  "rgba(246, 173, 85, 0.2)",
  "rgba(246, 173, 85, 0.2)",
  "rgba(104, 211, 145, 0.2)",
  "rgba(72, 187, 120, 0.2)",
  "rgba(79, 209, 197, 0.2)"
];
