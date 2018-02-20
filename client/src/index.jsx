import React from 'react';
import ReactDOM from 'react-dom';
import Users from './components/Users.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }

  render () {
    return (<div>
      <h1>WeatherOrNot</h1>
      {/* <List items={this.state.items}/> */}
      <h2>User...</h2>
      <Users />
    </div>)
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
