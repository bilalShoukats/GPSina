import React from 'react';

var objCounter = 0;
var latlongArray = [
    { lat: 3.205325, lng: 101.71088 },
    { lat: 3.205745, lng: 101.71053 },
    { lat: 3.20615833, lng: 101.71016833 },
    { lat: 3.20663833, lng: 101.70974167 },
    { lat: 3.20718833, lng: 101.70927667 },
    { lat: 3.20799833, lng: 101.70855833 },
    { lat: 3.20855667, lng: 101.70797833 },
    { lat: 3.209095, lng: 101.70744 },
    { lat: 3.20951333, lng: 101.70703833 },
    { lat: 3.21020833, lng: 101.70637833 },
    { lat: 3.21044833, lng: 101.70614167 },
    { lat: 3.21047167, lng: 101.70607833 },
    { lat: 3.210475, lng: 101.706015 },
    { lat: 3.21045833, lng: 101.70595333 },
    { lat: 3.210285, lng: 101.70574 },
    { lat: 3.20926833, lng: 101.70461667 },
    { lat: 3.20829167, lng: 101.70356167 },
    { lat: 3.20815, lng: 101.70341333 },
    { lat: 3.208125, lng: 101.70338833 },
    { lat: 3.20756333, lng: 101.70297 },
    { lat: 3.20667167, lng: 101.70243 },
];

export default class SampleGPSData {
    constructor() {}

    getWayPoints() {
        return latlongArray;
    }

    getNextLatLong() {
        var response = latlongArray[objCounter];
        if (objCounter + 1 >= latlongArray.length) objCounter = 0;
        else objCounter++;
        return response;
    }
}
