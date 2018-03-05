import React from 'react';
import CommuteItem from './CommuteItem.jsx';

class Commutes extends React.Component {
  constructor(props) {
    // expecting to have commutes, places, addCommuteHandler passed down in props.
    super(props);
    this.state = {
      time: '',
      aOrD: 'D',
      org: '',
      dest: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });
  }

  render() {
    return (
      <div>
        <br></br><br></br>
        <div className = "row" style={{marginLeft: '12%'}}>
        {this.state.aOrD === 'D' ? <button className = "col-sm-2" style={{backgroundColor:'rgb(5, 231, 255)', fontWeight: 500, borderRadius: '7px'}} onClick={()=> this.setState({aOrD: 'A'})}>Depart</button>
        : <button  style={{backgroundColor:'rgb(5, 231, 255)', fontWeight: 500, borderRadius: '7px', marginLeft: '1%'}}  onClick={()=> this.setState({aOrD: 'D'})}>Arrive</button>}
          <input
            className = "col-sm-2"
            style={{textAlign: 'center', fontWeight: 500, borderRadius: '7px', marginLeft: '1%'}}
            name="time"
            type="time"
            value={this.state.time}
            onChange={(e) => { this.onChange(e); }}
          />
          <input
            className = "col-sm-2"
            style={{textAlign: 'center', fontWeight: 500, borderRadius: '7px', marginLeft: '1%', marginBottom: '15px'}}
            name="org"
            type="select"
            placeholder={this.state.org || "origin"}
            value={this.state.org}
            onChange={(e) => { this.onChange(e); }}
          />
          <input
            className = "col-sm-2"
            style={{textAlign: 'center', fontWeight: 500, borderRadius: '7px', marginLeft: '1%'}}
            name="dest"
            type="select"
            placeholder={this.state.destination || "destination"}
            value={this.state.dest}
            onChange={(e) => { this.onChange(e); }}
          />
          <button className = "col-sm-2" onClick={()=> this.props.addCommuteHandler(this.state) } style ={{fontWeight: 500, backgroundColor:'rgb(5, 231, 255)', borderRadius: '7px', marginLeft: '1%'}}>Get Data</button>
        </div>
         <div>
          {this.props.commutes.map(commute =>
            (<CommuteItem
            key={commute.id}
            commute={commute}
            deleteCommutes={this.props.deleteCommutes}
          />))}
        </div>
      </div>
    );
  }
}

export default Commutes;
