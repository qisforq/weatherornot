import React from 'react';
import PlaceItem from './PlaceItem.jsx';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      placeType: 'home',
      showAddPlace: false,
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.toggleAddPlace = this.toggleAddPlace.bind(this);
    this.onAutocompleteChange = this.onAutocompleteChange.bind(this)
  }

  onChange(e) {
    // const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: e.target.value });
  }

  search(e) {
    e.preventDefault();
    console.log('SEARCHED!', address, placeType);
    let { address, placeType } = this.state;
    this.props.sendAddress(address, placeType);
  }

  toggleAddPlace() {
    // This function triggers the "Add a place" button to show the "enter address form"
    this.setState({
      showAddPlace: !this.state.showAddPlace,
    });
  }

  onAutocompleteChange(address) {
    this.setState({address})
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onAutocompleteChange
    }


    return (
      <div>
        <div className="placesBlock">
          {this.props.places.map((place, i) => <div key={i}>~~pretend this is the "{place}" icon~~</div>)}
        </div>
        <div className="addPlace">
          {this.state.showAddPlace ? (
            <form onSubmit={this.search}>
              <select name="placeType" value={this.state.placeType} onChange={(e) => { this.onChange(e); }}>
                <option value="home">Home</option>
                <option value="work">Work</option>
              </select>
              <PlacesAutocomplete inputProps={inputProps} />
              {/* <input
                name="address"
                type="text"
                value={this.state.address}
                placeholder="Enter address"
                onChange={(e) => { this.onChange(e); }}
              /> */}
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
