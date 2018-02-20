import React from 'react';
import PlaceItem from './PlaceItem.jsx';

class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      placeType: 'home'
    };
    this.onChange = this.onChange.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
  }

  onChange(e) {
    // const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: e.target.value });
  }

  search() {
    let {address, placeType} = this.state;
    this.props.sendAddress(address, placeType)
  }

  render() {
    return (
      <div>
        {/* <PlaceItem placeName='Home'/>
        <PlaceItem placeName='Work'/> */}

        <button onClick={this.search}>Add a place!</button>
                {/* ^^FIRST^^ click the button above and vvTHENvv it will bring up the input form below*/}
        <div className="addPlace">
          <select name="placeType" value={this.state.placeType} onChange={(e) => {this.onChange(e)}}>
            <option value="home">Home</option>
            <option value="work">Work</option>
          </select>
          <input
            name="address"
            type="text"
            value={this.state.address}
            placeholder="Enter address"
            onChange={(e) => {this.onChange(e)}}
          />
          <button onSubmit={this.search}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Places;
