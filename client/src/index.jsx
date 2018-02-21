import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Places from './components/Places.jsx';
import Commutes from './components/Commutes.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: ['home', 'work'],
    };
    this.sendAddress.bind(this)
  }


  componentDidMount() {
    axios.get('/weather').then((data) => {
      console.log('darksky', data);
    });

    axios.get('/search').then((data) => {
      console.log('MapsAPI', data);
    });
  }


  sendAddress(address, placeType) {
    // This should make a post request to google's api to get coordinates for the submitted address.
    console.log('address:', address, 'placeType:', placeType);

    axios.post('/address-submit-form-or-something-like-that', {
      address,
      placeType,
    })
      .then((response) => {
        console.log(response, 'axios response');
      // this.setState({})
      })
      .catch((error) => {
        console.log(error, 'axios error');
      });
  }

  render() {
    return (<div>
      <h1>WeatherOrNot</h1>
      <Places places={this.state.places} sendAddress={this.sendAddress} />
      {/* <List items={this.state.items}/> */}
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
