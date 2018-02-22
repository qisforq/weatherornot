import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Users from './components/Users.jsx'
import Places from './components/Places.jsx';
import Commutes from './components/Commutes.jsx';
import Status from './components/Status.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // places: ['home', 'work'],
      commutes: [],
      places: [],
      commutes: [],
      username: null
    };
    this.handleName = this.handleName.bind(this)
    this.sendAddress = this.sendAddress.bind(this)
    this.getPlacesWeather = this.getPlacesWeather.bind(this)
    this.deletePlace = this.deletePlace.bind(this)
  };

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
    this.setState({username: name}, () => {
      console.log(`ping? you got a ${this.state.username} in there?`);
      axios.post('/users', {
        username: this.state.username
      })
      .then(res => {
        console.log('ping!? here\'s the .then... (success?)');
        this.getPlacesWeather()
      })
      .catch((err) => {
        console.log(`error on post to /users: ${err}`);
      })
    })
  }

  sendAddress(address, placeType, lat, lng) {
    // This should make a post request to google's api to get coordinates for the submitted address.
    axios.post('/places', {
      address,
      placeType,
      lat,
      lng,
      username: this.state.username
    })
      .then((response) => {
        console.log(response, 'axios response!');
        console.log(this, '???');
        this.getPlacesWeather()
      })
      .catch((error) => {
        console.log(error, 'axios error');
      });
  }

  getPlacesWeather(){
    axios.get('/places', {
      // username: this.state.username
      params: {
        username: this.state.username
      }
    })
      .then((response) => {
        if (response.data.length){
          this.setState({
            places: response.data
          })
        }
        console.log('state.places: ', this.state.places);
      })
      .catch((error) => {
        console.log('error in client getPlacesWeather: ', error);
      })

    // recieve an array of places with their weather datas
    // set it to state
  }

  getCommutes() {
    axios.get('/commutes', {
      params: {username: username}
    })
    .catch((err)=> {
      console.log
    })
    .then((newCommutes) => {
      this.setState({ commutes: newCommutes })
    })
  }

  deletePlace(place) {
    axios.delete('/places', {
      params: {
        place: place
      }
    })
      .then(() => {
        this.getPlacesWeather()
      })
  }

  render() {
    return (
      <div>
        <h1>WeatherOrNot</h1>
        <h1>User...</h1>
        <Users
          handleName={this.handleName}
          username={this.state.username}
        />
        {
          this.state.username && // render after username is selected
          <Places
            places={this.state.places}
            sendAddress={this.sendAddress}
            username={this.state.username}
            deletePlace={this.deletePlace}
          />
        }
        <Commutes/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
