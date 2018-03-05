import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
    };
    this.getWeather = this.getWeather.bind(this);
  }

  componentWillReceiveProps(nextProps) { // requires nextProps to see the new props (see React docs)
    let newProps = Object.assign({}, nextProps);

    if (nextProps.places.length === 0) {
      newProps.places = this.props.places;
    }

    if (newProps.commutes && newProps.commutes.length > 0) {
      this.getWeather(newProps);
    }
  }

  getWeather(props) { // props about to be passed into the component
    if (props.places.length > 0) {
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

          return (hourUNIX > commuteUNIX - 1800 && hourUNIX > commuteUNIX + 1800); // ???
        });
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

          return (hourUNIX > commuteUNIX - 1800 && hourUNIX > commuteUNIX + 1800);
        });
        console.log(arrivalHour)
        statusArr.push(arrivalHour.icon);
      });
      this.setState({ status: statusArr });
    }
  }

  render() {
    let statIcon = 'CLEAR_DAY';
    let message = '';

    const statArr = this.state.status;
    if (statArr.includes('rain')) {
      statIcon = 'RAIN'
      message = `Looks like it's going to RAIN at some point during your day! Don't forget your umbrella!`
    } else if (statArr.includes('snow')) {
      message = `Looks like it's going to SNOW at some point during your day! Don't forget your boots!.`
      statIcon = 'SNOW'
    } else if (statArr.includes('clear')) {
      message = `Well look at that! Your day is looking beautiful.`
      statIcon = 'CLEAR_DAY'
    }

    return (
      // <pre>{JSON.stringify(this.state.status)}</pre>
      <div>
        <ReactAnimatedWeather
          icon={statIcon}
          color="goldenrod"
          size={128}
          animate
        />
      <div>{message}</div>
      </div>
      //if arr includes 'snow'
    );
  }
}

export default Status;
