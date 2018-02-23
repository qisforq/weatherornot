import React from 'react';


const PlaceItem = ({place, deletePlace}) => {

    return (
      <div
        className="place"
        onClick={() => {
          console.log("PLACE:",place.weather);
          // deletePlace(place)
        }}
        >

          <label>{place.name}</label>
          <div>~~pretendzies this is the "{place.name}" icon~~</div>
        </div>
      )

};

export default PlaceItem;
