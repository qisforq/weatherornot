import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/weather', 
    //   type: 'GET',
    //   headers: {"Content-Type": "application/json"},
    //   success: (data) => {
    //     console.log(data)
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });

     axios.get('/weather').then((data) => {
      console.log('darksky',data)
     })
    // $.ajax({
    //   url: '/search', 
    //   type: 'GET',
    //   dataType: 'json',
    //   success: (data) => {
    //     console.log(data)
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });


    axios.get('/search').then((data) => {
      console.log('MapsAPI',data)
    })

  }




  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));