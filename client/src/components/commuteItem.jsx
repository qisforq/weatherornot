import React from 'react';

const CommuteItem = ({ commute, deleteCommutes }) => {
  if (commute.arriveordepart === 'A') {
    return (
      <div className= 'col-sm-6' style={{textAlign: 'center'}}>
        <div></div>
        <div>{`Arriving at: ${commute.time}`}</div>
        <div>{`From ${commute.origin.name}`}</div>
        <div>{`To ${commute.destination.name}`}</div>
        <div>{`Duration ${commute.travelTime.text}`}</div>
        <div>
          <button
            onClick={() => { deleteCommutes(commute); }}
          >Delete
          </button>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  } else if (commute.arriveordepart === 'D') {
    return (
      <div style={{textAlign: 'center', marginTop: '10px'}}>
        <div>{`Departing at: ${commute.time}   From ${commute.origin.name}    To ${commute.destination.name}    Duration ${commute.travelTime.text}`}</div>
        {/* <div>{`From ${commute.origin.name}`}</div>
        <div>{`To ${commute.destination.name}`}</div>
        <div>{`Duration ${commute.travelTime.text}`}</div> */}
        <div>
          <button
            onClick={() => { deleteCommutes(commute); }}
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
