const height = window.innerHeight - 55 + 'px';
const width = window.innerWidth + 'px';
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const GoogleMapsAPI = 'AIzaSyAbq8yVUGOp7j7rCp2YJfRhYv5326OJZYg';

export {
    // app dimensions
    width,
    height,
    ASPECT_RATIO,

    // default region value on maps
    LATITUDE,
    LONGITUDE,

    // Google Map API Key
    GoogleMapsAPI,
};