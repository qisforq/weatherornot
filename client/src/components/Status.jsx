import React from 'react';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
    };
    this.getDestWeather = this.getDestWeather.bind(this);
    this.getOriginWeather = this.getOriginWeather.bind(this);
  }

  getOriginWeather() {
    var x = this.props.commutes.reduce((acc, commute) => {
      console.log('places', this.props.places);
      console.log('commutes', this.props.commutes);
      console.log('checking origin');
      if (acc !== 'snow') {
        // for the origin of each commute

        const origin = this.props.places.find(place => place.id === commute.origin.id);

        const departureHour = origin.weather.hourly.data.find((hour) => {
          // find hour that describes departure time
          // 3600 seconds in hour
          const hourUNIX = hour.time
          const commuteUNIX = Math.floor(new Date(commute.departure).getTime() / 1000);

          console.log('hour: ', hourUNIX, '  comm:', commuteUNIX);


          return (hourUNIX > commuteUNIX - 1800 && hourUNIX > commuteUNIX + 1800); // ???
        });

        console.log('DEPT HOUR: ', departureHour);

        // this.state.status.push(departureHour.icon)
        // check the coresponding place's weather
        if (acc === 'clear') {
          if (departureHour.icon === 'rain' || departureHour.icon === 'snow') {
            return departureHour.icon;
          }
          return acc;
        } else if (acc === 'rain') {
          if (departureHour.icon === 'snow') {
            return departureHour.icon;
          }
          return acc;
        }
        return acc;
      }
    }, 'clear');
    console.log(x)
    return x
  }

  getDestWeather() {
    var y = this.props.commutes.reduce((acc, commute) => {
      console.log('checking destination');
      if (acc !== 'snow') {
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
        // check the coresponding place's weather
        if (acc === 'clear') {
          if (arrivalHour.icon === 'rain' || arrivalHour.icon === 'snow') {
            return arrivalHour.icon;
          }
          return acc;
        } else if (acc === 'rain') {
          if (arrivalHour.icon === 'snow') {
            return arrivalHour.icon;
          }
          return acc;
        }
        return acc;
      }
    }, 'clear');
    console.log(y)
    return y
  }

  componentWillReceiveProps() {
    if ((this.props.commutes && this.props.commutes.length > 0) && (this.props.places && this.props.places.length > 0)) {
      console.log('comp will update');
      this.setState(
        {
          status: this.getOriginWeather(),
        },

        () => {
          if (this.state.status === 'clear' || this.state.status === 'rain') {
            this.setState({

              status: this.getDestWeather(),

            });
          }
        },
      );
    }
  }

  render() {
    if (this.state.status === 'clear') {
      return (
        <div>Clear</div>
      );
    } else if (this.state.status === 'rain') {
      return (
        <div>Rain</div>
      );
    } else if (this.state.status === 'snow') {
      return (
        <div>Snow</div>
      );
    }
    return (
      <div>Loading</div>
    );
  }
}

export default Status;
