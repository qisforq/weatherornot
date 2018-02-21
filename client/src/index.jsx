import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Users from './components/Users.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      username: null
    }
    // this.handleName = this.handleName.bind(this)
  }

  handleName(name) {
    this.state.username = name
    // app.post('/user', function(req, res) {
      console.log('user posted');
    // })
  }

  componentDidMount() {

    axios.get('/weather').then((data) => {
      console.log('darksky',data)
     })

    axios.get('/search').then((data) => {
      console.log('MapsAPI',data)
    })

  }

  render () {
    return (<div>
      <h1>WeatherOrNot</h1>
      <h1>User...</h1>
      <Users handleName={this.handleName} username={this.state.username}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
