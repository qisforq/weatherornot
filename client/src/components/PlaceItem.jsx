import React from 'react';
import Skycons from 'skycons';
import ReactAnimatedWeather from 'react-animated-weather';

const PlaceItem = ({ place, deletePlace }) => {
  // console.log("SKYCONS:", Skycons);
  // console.log("sky:", sky.prototype);
  // sky.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
  const defaults = {
    'clear-day': 'CLEAR_DAY',
    'clear-night': 'CLEAR_NIGHT',
    'partly-cloudy-day': 'PARTLY_CLOUDY_DAY',
    'partly-cloudy-night': 'PARTLY_CLOUDY_NIGHT',
    CLOUDY: 'cloudy',
    RAIN: 'rain',
    SLEET: 'sleet',
    SNOW: 'snow',
    WIND: 'wind',
    FOG: 'fog',
  };

  return (
    <div
      className="place"
      onClick={() => {deletePlace(place)}}
    >
      <ReactAnimatedWeather
          icon={defaults[place.weather.current.icon] || 'SLEET'}
          color="black"
          size={64}
          animate
        />
      <label>{place.name}</label>
    </div>
  );
};

export default PlaceItem;
