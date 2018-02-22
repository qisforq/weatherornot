import React from 'react';


const PlaceItem = ({placeName}) => (
  <div className="place">
    <label>{placeName}</label>
    <div>~~pretendzies this is the "{placeName}" icon~~</div>
  </div>
);

export default PlaceItem;
