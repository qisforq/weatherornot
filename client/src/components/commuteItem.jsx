import React from 'react';

const CommuteItem = ({ commute, deleteCommute }) => {
  console.log('haha',commute)
  if (commute.arriveordepart === 'A') {
    return (
      <div>
        <div></div>
        <div>{`Arriving at: ${commute.time}`}</div>
        <div>{`From ${commute.origin.name}`}</div>
        <div>{`To ${commute.destination.name}`}</div>
        <div>{`Duration ${commute.travelTime.text}`}</div>
        <div>
          <button
            onClick={() => { deleteCommute(commute); }}
          >Delete
          </button>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  } else if (commute.arriveordepart === 'D') {
    return (
      <div>
        <div>{`Departing at: ${commute.time}`}</div>
        <div>{`From ${commute.origin.name}`}</div>
        <div>{`To ${commute.destination.name}`}</div>
        <div>{`Duration ${commute.travelTime.text}`}</div>
        <div>
          <button
            onClick={() => { deleteCommute(commute); }}
          >Delete
          </button>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
};

export default CommuteItem;
