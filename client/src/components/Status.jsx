import React from 'react';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
    };
    this.getWeather = this.getWeather.bind(this);
  }

  getWeather() {
    var statusArr = [];
    this.props.commutes.forEach((commute) => {
      // console.log('places', this.props.places);
      // console.log('commutes', this.props.commutes);
      // console.log('checking origin');
        // for the origin of each commute
        const origin = this.props.places.find(place => place.id === commute.origin.id);

        const departureHour = origin.weather.hourly.data.find((hour) => {
          // find hour that describes departure time
          // 3600 seconds in hour
          const hourUNIX = hour.time
          const commuteUNIX = Math.floor(new Date(commute.departure).getTime() / 1000);

          // console.log('hour: ', hourUNIX, '  comm:', commuteUNIX);


          return (hourUNIX > commuteUNIX - 1800 && hourUNIX > commuteUNIX + 1800); // ???
        });

        // console.log('DEPT HOUR: ', departureHour);
        console.log(">>>>>>>>>>>", departureHour, "<<<<<<<<<<");
        statusArr.push(departureHour.icon)

        // this.state.status.push(departureHour.icon)
        // check the coresponding place's weather

    });
    this.props.commutes.forEach((commute) => {
      console.log('checking destination');
        // for the destination of each commute
        const destination = this.props.places.find(place => place.id === commute.destination.id);

        const arrivalHour = destination.weather.hourly.data.find((hour) => {
          // find hour that describes arrival time
          // 3600 seconds in hour
          const hourUNIX = hour.time
          const commuteUNIX = Math.floor(new Date(commute.departure).getTime() / 1000);

          console.log('hour: ', hourUNIX, '  comm:', commuteUNIX);

          return (hourUNIX > commuteUNIX - 1800 && hourUNIX > commuteUNIX + 1800);
        });
        statusArr.push(arrivalHour.icon)
    });
    this.setState({status: statusArr})
  }


  componentWillReceiveProps() {
    this.getWeather();
  }

  render() {
    return (
      <pre>Loading</pre>
    );
  }
}

export default Status;
