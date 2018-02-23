import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Users from './components/Users.jsx'
import Places from './components/Places.jsx';
import Commutes from './components/Commutes.jsx';
import Status from './components/Status.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // places: ['home', 'work'],
      commutes: [],
      places: [],
      username: null
    };
    this.handleName = this.handleName.bind(this)
    this.sendAddress = this.sendAddress.bind(this)
    this.getPlacesWeather = this.getPlacesWeather.bind(this)
    this.deletePlace = this.deletePlace.bind(this)
    this.showMeTheWay = this.showMeTheWay.bind(this)
    this.getCommutes = this.getCommutes.bind(this)
    this.deleteCommutes = this.deleteCommutes.bind(this)
  };
    // this.handleName = this.handleName.bind(this)
  componentDidMount() {

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
      .then(() => {
        this.getCommutes()
      })
      .catch((err) => {
        console.log(`error on post to /users: ${err}`);
      })
    })
  }

  showMeTheWay({time, aOrD, org, dest}) {
    axios.post('/commutes', {
      time, aOrD, org, dest, username: this.state.username, name: org + ' > ' + dest
    })
      .then((response) => {
        console.log(response, 'axios response');
        // this.setState({commutes: response.})
      })
      .then(() => {
        this.getCommutes()
      })
      .catch((error) => {
        console.log(error, 'axios error');
      });
  }

  getCommutes(){
    return axios.get('/commutes', {
      params: {
        username:this.state.username
      }
    })
    .then((data)=> {
      console.log('GET commutes data: ', data.data)
      this.setState({commutes: data.data})
    })
  }

  deleteCommutes(commuteId){
    return axios.delete('/commutes',{
      params: {
        commuteId: commuteId
      }
    })
    .then(() => {
      this.getPlacesWeather()
    })
    .then(() => {
      this.getCommutes()
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
    console.log(this.state)
    axios.get('/places', {
      // username: this.state.username
      params: {
        username: this.state.username
      }
    })
      .then((response) => {
        console.log(response.data)
        this.setState({
          places: response.data
        })
        console.log('state.places: ', this.state.places);
      })
      .catch((error) => {
        console.log('error in client getPlacesWeather: ', error);
      })

    // recieve an array of places with their weather datas
    // set it to state
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
      .then(() => {
        this.getCommutes()
      })
  }

  render() {
    return (
    <MuiThemeProvider>
      <div>
        <h1>WeatherOrNot</h1>
        <Status commutes={this.state.commutes} places={this.state.places} />
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
        {/* <Commutes/> */}
        {this.state.places.length > 1 &&
          <Commutes
            commutes={this.state.commutes}
            addCommuteHandler={this.showMeTheWay}
            deleteCommutes={this.deleteCommutes}
          />
        }
      </div>
    </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
