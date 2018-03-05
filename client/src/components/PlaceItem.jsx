import React from 'react';
import Skycons from 'skycons'
import ReactAnimatedWeather from 'react-animated-weather';

const PlaceItem = ({place, deletePlace}) => {
  const defaults = {
    'clear-day': 'CLEAR_DAY',
    'clear-night': 'CLEAR_NIGHT',
    'partly-cloudy-day': 'PARTLY_CLOUDY_DAY',
    'partly-cloudy-night': 'PARTLY_CLOUDY_NIGHT',
    CLOUDY: 'cloudy',
    'RAIN': 'rain',
    'SLEET': 'sleet',
    'SNOW': 'snow',
    'WIND': 'wind',
    'FOG': 'fog'
  }

  return (
    <div className="place">
      <div className = "col-sm-6" style={{textAlign: 'center'}} >
        <label
          onClick={() => {
            deletePlace(place)
          }}>{place.name}</label>

        <div>
          <ReactAnimatedWeather
            icon={defaults[place.weather.current.icon] || 'SLEET'}
            color="black"
            size={32}
            animate
          />
        </div>
      </div>
    </div>
  )

};

export default PlaceItem;
