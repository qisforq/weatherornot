import React from 'react';


const PlaceItem = ({place, deletePlace}) => {
  if (place) {
    return (
      <div
        className="place"
        // onClick={(e) => {deletePlace(placeName)}}
        onClick={() => {
          console.log('this is deleting ', place.name);
          deletePlace(place)
        }}
        >
        <label>{place.name}</label>
        <div>~~pretendzies this is the "{place.name}" icon~~</div>
      </div>
    )
  } else {
    return <div></div>
  }
};

export default PlaceItem;
