import React from 'react';

const CommuteItem = ({ commute, deleteCommute }) => {
  if (commute.a_or_d === 'A') {
    return (
      <div>
        <div>{`FROM ${commute.orig}`}</div>
        <div>{`AT ${commute.time - commute.duration}`}</div>
        <div><h1>{'>'}</h1></div>
        <div>{`TO ${commute.dest}`}</div>
        <div>{`AT ${commute.time}`}</div>
        <div>
          <button
            onClick={() => { deleteCommute(commute); }}
          >Delete
          </button>
        </div>
      </div>
    );
  } else if (commute.a_or_d === 'D') {
    return (
      <div>
        <div>{`FROM ${commute.orig}`}</div>
        <div>{`AT ${commute.time}`}</div>
        <div><h1>{'<'}</h1></div>
        <div>{`TO ${commute.dest}`}</div>
        <div>{`AT ${commute.time + commute.duration}`}</div>
        <div>
          <button
            onClick={() => { deleteCommute(commute); }}
          >Delete
          </button>
        </div>
      </div>
    );
  }
};

export default CommuteItem;
