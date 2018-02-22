import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Users from './components/Users.jsx'
import Places from './components/Places.jsx';
import Commutes from './components/Commutes.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // places: ['home', 'work'],
      places: [],
      username: null
    };
    this.handleName = this.handleName.bind(this)
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

  handleName(name) {
    this.setState({username: name})
    console.log(`ping? you got a ${name} in there?`);
    axios.post('/users',{
      username: name
    })
    .then(res => {
      console.log('ping!? here\'s the .then... (success?)');
    })
    .catch((err) => {
      console.log(`error on post to /users: ${err}`);
    })
  }

  sendAddress(address, placeType, lat, lng, username) {
    // This should make a post request to google's api to get coordinates for the submitted address.
    axios.post('/places', {
      address,
      placeType,
      lat,
      lng,
      username
    })
      .then((response) => {
        console.log(response, 'axios response');
      // this.setState({})
      })
      .catch((error) => {
        console.log(error, 'axios error');
      });
  }

  getWeather(){
    axios.get('/places', {
      // username: this.state.username
      params: {
        username: this.state.username
      }
    })
      .then((response) => {
        this.setState({
          places: response
        })
        console.log('state.places: ', this.state.places);
      })
      .catch((error) => {
        console.log('error in client getWeather: ', error);
      })

    // recieve an array of places with their weather datas
    // set it to state
  }

  render() {
    return (
      <div>
        <h1>WeatherOrNot</h1>
        <h1>User...</h1>
        <Users handleName={this.handleName.bind(this)} username={this.state.username} />
        {this.state.username && <Places places={this.state.places} sendAddress={this.sendAddress} username={this.state.username} />}
        <button onClick={()=> this.getWeather() } >test getWeather</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
