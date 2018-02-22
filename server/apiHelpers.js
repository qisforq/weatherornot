const axios = require('axios');
const geocoder = require('google-geocoder');
const config = require('./config.js');

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

exports.getTravelTime = (commute) => {
  const {
    origin, destination, time, aOrD,
  } = commute;

  const rootURL = 'https://maps.googleapis.com/maps/api/directions/json?';
  const originStr = `${origin.latitude},${origin.longitude}`;
  const destinationStr = `${destination.latitude},${destination.longitude}`;
  const deptOrArive = aOrD === 'A' ? 'arrival_time' : 'departure_time';


  const URL = `${rootURL}origin=${originStr}&destination=${destinationStr}&${deptOrArive}=${time}&key=${config.googleMapsAPI}&mode="walking"`;

  return axios.get(URL)
    .then((data) => {
      if (data.data.routes.length > 0) {
        return Object.assign(commute, { travelTime: data.data.routes[0].legs[0].duration });
      }
      return Object.assign(commute, { travelTime: { text: 'N/A', value: null } });
    });
};


// GET REQUEST TO DARK SKY API, IF NO LATITUDE OR LONGITUDE, RETURN PRESET
// takes lat and lng for a given place
exports.getWeather = (place) => {
  const rootUrl = 'https://api.darksky.net/forecast';
  const APIKey = config.darkSkyAPI;

  return axios.get(`${rootUrl}/${APIKey}/${place.latitude},${place.longitude}`)
    .then((data, err) => Object.assign(place, { weather: { current: data.data.currently, hourly: data.data.hourly } }))
    .catch(err => console.log('ALLLEGRA IS HELPING', err, place));
};

exports.geo = geocoder({
  key: config.geocodeAPI,
});
