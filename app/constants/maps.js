const height = window.innerHeight - 55 + 'px';
const width = window.innerWidth + 'px';
const ASPECT_RATIO = width / height;
const LATITUDE = 3.205325;
const LONGITUDE = 101.71088;
const GoogleMapsAPI = 'AIzaSyAbq8yVUGOp7j7rCp2YJfRhYv5326OJZYg';
const PADDING = { top: 50, bottom: 50, left: 50, right: 50 };

export {
    // app dimensions
    width,
    height,
    ASPECT_RATIO,
    // default region value on maps
    LATITUDE,
    LONGITUDE,
    // default padding
    PADDING,
    // Google Map API Key
    GoogleMapsAPI,
};
