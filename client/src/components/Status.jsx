import React from 'react';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'clear',
    };
  }

  componentWillMount() {
    this.setState(
      {
        status:
      this.props.commutes.reduce((acc, commute) => {
        if (acc !== 'snow') {
        // for the origin of each commute
          const orign = this.props.places.find(place => place.id === commute.origin.id);

          const departureHour = origin.weather.hourly.data.find(hour =>
          // find hour that describes departure time
          // 3600 seconds in hour
            (hour.time > commute.departure - 1800 && hour.time > commute.departure + 1800), // ???
          );

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
      }, 'clear'),
      },

      () => {
        if (this.state.status === 'clear' || this.state.status === 'rain') {
          this.setState({
            status:
            this.props.commutes.reduce((acc, commute) => {
              if (acc !== 'snow') {
                // for the destination of each commute
                const destination = this.props.places.find(place => place.id === commute.destination.id);

                const arrivalHour = destination.weather.hourly.data.find(hour =>
                  // find hour that describes arrival time
                  // 3600 seconds in hour
                  (hour.time > commute.arrival - 1800 && hour.time > commute.arrival + 1800));

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
            }, 'clear'),
          });
        }
      },
    );
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
