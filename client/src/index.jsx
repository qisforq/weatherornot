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
      items: [],
      username: null
    }
    // this.handleName = this.handleName.bind(this)
  }

  handleName(name) {
    this.setState. = name
    // app.post('/user', function(req, res) {
      console.log('user posted');
    // })
  }


  componentDidMount() {
    axios.get('/weather').then((data) => {
      console.log('darksky', data);
    }).catch((error) => {
      console.log(error, 'axios error');
    });

    axios.get('/search').then((data) => {
      console.log('MapsAPI', data);
    }).catch((error) => {
      console.log(error, 'axios error');
    });
  }


  sendAddress(address, placeType, lat, lng) {
    // This should make a post request to google's api to get coordinates for the submitted address.
    console.log('address:', address, 'placeType:', placeType);
    console.log('lat:', lat, 'long:', lng);
    axios.post('/places', {
      address,
      placeType,
      lat,
      lng
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
      <h1>User...</h1>
      <Users handleName={this.handleName} username={this.state.username}/>
    </div>)
      <Places places={this.state.places} sendAddress={this.sendAddress} />
      {/* <List items={this.state.items}/> */}
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
