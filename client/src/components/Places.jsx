import React from 'react';
import PlaceItem from './PlaceItem.jsx';
import config from '../../../server/config.js';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import LocationAutocomplete from 'location-autocomplete';

class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      showAddHome: false,
      showAddWork: false,
      lat: '',
      lng: '',
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.toggleAddPlace = this.toggleAddPlace.bind(this);
    // this.onAutocompleteChange = this.onAutocompleteChange.bind(this)
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  search(e, placeType) {
    e.preventDefault();
    const {
      address, lat, lng,
    } = this.state;
    this.props.sendAddress(address, placeType, lat, lng);
    if (placeType === 'home') {
      this.toggleAddPlace('Home');
    } else {
      this.toggleAddPlace('Work');
    }
  }

  toggleAddPlace(locationType) {
    console.log(locationType)
    // This function triggers the "Add a place" button to show the "enter address form"
    if (locationType === 'Home') {
      this.setState({
        showAddHome: !this.state.showAddHome,
      });
    } else {
      this.setState({
        showAddWork: !this.state.showAddWork,
      });
    }
  }

  // onAutocompleteChange(address) {
  //   this.setState({address})
  // }

  onDropdownSelect(e) {
    const lat = e.autocomplete.getPlace().geometry.location.lat();
    const lng = e.autocomplete.getPlace().geometry.location.lng();
    const adr = e.autocomplete.getPlace().formatted_address;

    this.setState({
      lat,
      lng,
      address: adr,
    });
  }

  render() {
    const home = this.props.places.find(place => place.name === 'home');
    const work = this.props.places.find(place => place.name === 'work');

    if (home && work) {
      return (
        <div>
          <PlaceItem key={home.id} place={home} deletePlace={() => this.props.deletePlace(home)} />
          <PlaceItem key={work.id} place={work} deletePlace={() => this.props.deletePlace(work)} />
        </div>
      );
    } else if (home && !work) {
      return (
        <div>
          <PlaceItem key={home.id} place={home} deletePlace={() => this.props.deletePlace(home)} />
          {this.state.showAddWork ?
            <form onSubmit={e => this.search(e, 'work')}>
              <LocationAutocomplete
                name="address"
                placeholder="Enter Address"
                locationType="geocode"
                googleAPIKey="AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g"
                onChange={(e) => { this.onChange(e); }}
                onDropdownSelect={(e) => { this.onDropdownSelect(e); }}
              />
              <button style={{backgroundColor:'rgb(0, 148, 255)', fontWeight: 500, borderRadius: '7px'}} type="submit">Submit</button>
            </form>
            : <button style={{backgroundColor:'rgb(0, 148, 255)', fontWeight: 500, borderRadius: '7px', marginLeft: '1%', marginTop: '10px'}}  onClick={(e)=>this.toggleAddPlace(e.target.innerText)}>Work</button>}
        </div>
      );
    } else if (!home && work) {
      return (
        <div>
          {this.state.showAddHome ?
            <form onSubmit={e => this.search(e, 'home')}>
              <LocationAutocomplete
                name="address"
                placeholder="Enter Address"
                locationType="geocode"
                googleAPIKey="AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g"
                onChange={(e) => { this.onChange(e); }}
                onDropdownSelect={(e) => { this.onDropdownSelect(e); }}
              />
              <button  style={{backgroundColor:'rgb(0, 148, 255)', fontWeight: 500, borderRadius: '7px'}} type="submit">Submit</button>
            </form>
            : <button style={{backgroundColor:'rgb(0, 148, 255)', fontWeight: 500, borderRadius: '7px', marginLeft: '1%', marginTop: '10px'}} onClick={(e)=>this.toggleAddPlace(e.target.innerText)}>Home</button>}
          <PlaceItem key={work.id} place={work} deletePlace={() => this.props.deletePlace(work)} />
        </div>
      );
    }
    return (
    <div>
      {this.state.showAddHome ?
        <form onSubmit={e => this.search(e, 'home')}>
          <LocationAutocomplete
            name="address"
            placeholder="Enter Address"
            locationType="geocode"
            googleAPIKey="AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g"
            onChange={(e) => { this.onChange(e); }}
            onDropdownSelect={(e) => { this.onDropdownSelect(e); }}
          />
          <button  style={{backgroundColor:'rgb(0, 148, 255)', fontWeight: 500, borderRadius: '7px'}}  type="submit">Submit</button>
        </form>
        : <button style={{backgroundColor: 'rgb(0, 148, 255)', fontWeight: 500, borderRadius: '7px', marginLeft: '1%', marginTop: '10px'}} onClick={(e)=>this.toggleAddPlace(e.target.innerText)}>Home</button>}
      {this.state.showAddWork ?
        <form onSubmit={e => this.search(e, 'work')}>
          <LocationAutocomplete
            name="address"
            placeholder="Enter Address"
            locationType="geocode"
            googleAPIKey="AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g"
            onChange={(e) => { this.onChange(e); }}
            onDropdownSelect={(e) => { this.onDropdownSelect(e); }}
          />
          <button  style={{backgroundColor:'rgb(0, 148, 255)', fontWeight: 500, borderRadius: '7px'}}  type="submit">Submit</button>
        </form>
        : <button style={{backgroundColor:'rgb(0, 148, 255)', fontWeight: 500, borderRadius: '7px', marginLeft: '1%', marginTop: '10px'}}  onClick={(e)=>this.toggleAddPlace(e.target.innerText)}>Work</button>}
    </div>
    );
  }
}

export default Places;
