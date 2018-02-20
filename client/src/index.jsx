import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
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
      {/* <List items={this.state.items}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

