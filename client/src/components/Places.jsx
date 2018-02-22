import React from 'react';
import PlaceItem from './PlaceItem.jsx';
import config from '../../../server/config.js'
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import LocationAutocomplete from 'location-autocomplete';

class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      placeType: 'home',
      showAddPlace: false,
      lat: '',
      lng: ''
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.toggleAddPlace = this.toggleAddPlace.bind(this);
    // this.onAutocompleteChange = this.onAutocompleteChange.bind(this)
    this.onDropdownSelect = this.onDropdownSelect.bind(this)
  }

  onChange(e) {
    // const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    // console.log("the name", e.target.name);
    // console.log("the value", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  search(e) {
    e.preventDefault();
    let { address, placeType, lat, lng } = this.state;
    this.props.sendAddress(address, placeType, lat, lng, this.props.username);
  }

  toggleAddPlace() {
    // This function triggers the "Add a place" button to show the "enter address form"
    this.setState({
      showAddPlace: !this.state.showAddPlace,
    });
  }

  // onAutocompleteChange(address) {
  //   this.setState({address})
  // }

  onDropdownSelect(e) {
    let lat = e.autocomplete.getPlace().geometry.location.lat();
    let lng = e.autocomplete.getPlace().geometry.location.lng();
    this.setState({
      lat: lat,
      lng: lng
    });
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onAutocompleteChange
    }


    return (
      <div>
        {/* <div className="placesBlock">
          {this.props.places.map((place, i) => <div key={i}>~~pretend this is the "{place}" icon~~</div>)}
        </div> */}
        <div className="addPlace">
          {this.state.showAddPlace ? (
            <form onSubmit={this.search}>
              <select name="placeType" value={this.state.placeType} onChange={(e) => { this.onChange(e); }}>
                <option value="home">Home</option>
                <option value="work">Work</option>
              </select>
              {/* <PlacesAutocomplete inputProps={inputProps} /> */}
              {/* <input
                name="address"
                type="text"
                value={this.state.address}
                placeholder="Enter address"
                onChange={(e) => { this.onChange(e); }}
              /> */}
              <LocationAutocomplete
                name="address"
                placeholder="Enter Address"
                locationType="geocode"
                googleAPIKey= "AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g"
                onChange={(e) => {this.onChange(e)}}
                onDropdownSelect={(e) => {this.onDropdownSelect(e)}}
              />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <button onClick={this.toggleAddPlace}>Add a place!</button>
          )}
        </div>
      </div>
    );
  }
}

export default Places;
