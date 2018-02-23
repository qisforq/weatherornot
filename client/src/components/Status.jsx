import React from 'react';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
    };
    this.getWeather = this.getWeather.bind(this);
  }

  componentWillReceiveProps(nextProps) { // requires nextProps to see the new props (see React docs)
    console.log('COMPWILLPROPS   ', 'commutes', nextProps.commutes, 'places', nextProps.places)
    if (nextProps.commutes && nextProps.commutes.length > 0) {
      console.log('running')
      this.getWeather(nextProps);
    }
  }

  getWeather(props) { // props about to be passed into the component
    let statusArr = [];
    props.commutes.forEach((commute) => {
      console.log('checking origin');
      // for the origin of each commute
      const origin = props.places.find(place => place.id === commute.origin.id);

      const departureHour = origin.weather.hourly.data.find((hour) => {
        // find hour that describes departure time
        // 3600 seconds in hour
        const hourUNIX = hour.time;
        const commuteUNIX = Math.floor(new Date(commute.departure).getTime() / 1000);

        // console.log('hour: ', hourUNIX, '  comm:', commuteUNIX);


        return (hourUNIX > commuteUNIX - 1800 && hourUNIX > commuteUNIX + 1800); // ???
      });
      console.log(departureHour)
      statusArr.push(departureHour.icon);
    });

    props.commutes.forEach((commute) => {
      console.log('checking destination');
      // for the destination of each commute
      const destination = props.places.find(place => place.id === commute.destination.id);

      const arrivalHour = destination.weather.hourly.data.find((hour) => {
        // find hour that describes arrival time
        // 3600 seconds in hour
        const hourUNIX = hour.time;
        const commuteUNIX = Math.floor(new Date(commute.departure).getTime() / 1000);

        console.log('hour: ', hourUNIX, '  comm:', commuteUNIX);

        return (hourUNIX > commuteUNIX - 1800 && hourUNIX > commuteUNIX + 1800);
      });
      console.log(arrivalHour)
      statusArr.push(arrivalHour.icon);
    });
    this.setState({ status: statusArr });
  }

  render() {
    return (
      <pre>{JSON.stringify(this.state.status)}</pre>
    );
  }
}

export default Status;
