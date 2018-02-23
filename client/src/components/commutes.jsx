import React from 'react';
import CommuteItem from './CommuteItem.jsx';
import {TimePicker, RadioButtonGroup, RadioButton, DropDownMenu, MenuItem} from 'material-ui'
import mUI from 'material-ui'

class Commutes extends React.Component {
  constructor(props) {
    // expecting to have commutes, places, addCommuteHandler passed down in props.
    super(props);
    this.state = {
      time: '',
      aOrD: 'D',
      org: '',
      dest: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });
  }

  render() {
    console.log('ahhhhhh', this.props.commutes)
    return (
      <div>
        <div>

        </div>
        <TimePicker name="timePicker" placeholder="Time" />
        <RadioButtonGroup name="AorD">
          <RadioButton value="A" label="Arrive" />
          <RadioButton value="D" label="Depart" />
        </RadioButtonGroup>
        <DropDownMenu name="dropDown">
          <MenuItem value="A" name="Arrive" />
          <MenuItem value="D" name="Depart" />
        </DropDownMenu>
        <div>
          <input
            name="deptOrArival"
            type="checkbox"
            value={this.state.deptOrArival}
            deleteCommute={this.props.deleteCommute}
            onChange={(e) => { this.onChange(e); }}
          />
        {this.state.aOrD === 'D' ? <button onClick={()=> this.setState({aOrD: 'A'})}>Depart</button>
        : <button onClick={()=> this.setState({aOrD: 'D'})}>Arrive</button>}
          <input
            name="time"
            type="time"
            value={this.state.time}
            onChange={(e) => { this.onChange(e); }}
          />
          <input
            name="org"
            type="select"
            placeholder={this.state.org || "origin"}
            value={this.state.org}
            onChange={(e) => { this.onChange(e); }}
          />
          <input
            name="dest"
            type="select"
            placeholder={this.state.destination || "destination"}
            value={this.state.dest}
            onChange={(e) => { this.onChange(e); }}
          />
          <button onClick={()=> this.props.addCommuteHandler(this.state) } >Get All Commute Data</button>
        </div>
         <div>
          {this.props.commutes.map(commute =>
            (<CommuteItem
            key={commute.id}
            commute={commute}
            deleteCommute={this.props.deleteCommute}
          />))}
        </div>
      </div>
    );
  }
}

export default Commutes;
