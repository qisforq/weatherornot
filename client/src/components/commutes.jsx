import React from 'react';
import CommuteItem from './CommuteItem';

class Commutes extends React.Component {
// expecting to have commutes, places, addCommuteHandler, and deleteCommuteHandler passed down in props.
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      deptOrArival: '',
      origin: '',
      dest: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });
  }

  render() {
    return (
      <div>
        <div>
          {this.props.commutes.map(commute =>
          (<CommuteItem
            key={commute.id}
            commute={commute}
            deleteCommute={this.props.deleteCommute}
          />))}
        </div>
        <div>
          <input
            name="deptOrArival"
            type="checkbox"
            value={this.state.deptOrArival}
            deleteCommute={this.props.deleteCommute}
            onChange={(e) => { this.onChange(e); }}
          />
          <input
            name="time"
            type="time"
            value={this.state.time}
            onChange={(e) => { this.onChange(e); }}
          />
          <input
            name="origin"
            type="select"
            value={this.state.origin}
            onChange={(e) => { this.onChange(e); }}
          />
          {this.props.places.map(place => (
            <option value={place.name}>{place.name}</option>
          ))}

          <input
            name="dest"
            type="select"
            value={this.state.dest}
            onChange={(e) => { this.onChange(e); }}
          />
          {this.props.places.map(place => (
            <option value={place.name}>{place.name}</option>
            ))}
        </div>
      </div>
    );
  }
}

export default Commutes;
