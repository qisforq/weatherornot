let axios = require('axios');
let geocoder = require('google-geocoder');
let config = require('./config.js')

// GET REQUEST TO GOOGLEMAPS API FOR LAT/LONG/ ORIGIN/DESTINATION AND DISTANCE/TIME

/*
commute = {
  origin: {
    lat:
    lng:
  },
  destination: {
    lat:
    lng:
  }
  time: UTC,
  aOrD: 'A'
}
*/

exports.getPlaceLocation = ({ origin, destination, time, aOrD }) => {
  const rootURL = 'https://maps.googleapis.com/maps/api/directions/json?';
  const originStr = `${origin.lng},${origin.lat}`;
  const destinationStr = `${destination.lng},${destination.lat}`;
  const deptOrArive = aOrD === 'A' ? 'arrival_time' : 'departure_time';

  const URL = `${rootURL}origin=${originStr}&destination=${destinationStr}&${deptOrArive}=${time}&key=${config.googleMapsAPI}`;

  return axios.get(URL);
};


// GET REQUEST TO DARK SKY API, IF NO LATITUDE OR LONGITUDE, RETURN PRESET
// takes lat and lng for a given place
exports.getWeather = (place) => {
  const rootUrl = 'https://api.darksky.net/forecast';
  const APIKey = config.darkSkyAPI;

  return axios.get(`${rootUrl}/${APIKey}/${place.lat},${place.lng}`);
};

const geo = geocoder({
  key: config.geocodeAPI,
});
