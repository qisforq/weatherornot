# Weather Or Not

Weather Or Not is an application that calculates a weather timeline for your day, taking into account all the places on your itinerary for that day. Enter in the locations you plan on visiting, and the time you plan on being there, and WeatherOrNot will calculate your weather timeline and tell you *whether or not* it's going to rain during your day!

## Team

  - __Product Owner__: Quentin Vidal
  - __Scrum Master__: Riley Alsman
  - __Development Team Members__: Eric Shum, Manos Kourkoulakos

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

>

To run locally use:
- npm run rect-dev
- npm run server-dev

Get keys for
- Darksky API
- Google Directions API
- Google Geolocator API
- NOTE: Google Autocomplete key is in client - should be moved to backend

## Requirements

## Development

### Installing Dependencies


1. Fork and clone:
```git clone https://github.com/hr-jonson/weatherornot.git```

2. From within the root directory:
`npm install`

3. Start the database (in a new terminal window):
```
mysql.server start
npm run sql-dev
```

4. start webpack (in a new terminal window):
```npm run react-dev```

5. start local server (in a new terminal window):
```npm run server-dev```


### Roadmap

- Add timeline instead of status to show a user's commute and weather throughout their day. Think of Waze diriving timeline.
- Style using a material UI like design
- Add multiple places other than just home and work
- Push notifications
- Google Cal integration
- Predict the future

- See diagram for arcitecture and mvp+ features (shown highlighted in grey)
- https://docs.google.com/drawings/d/1iH1lvPSc7Arz6kDMuYgxh8z5ffp6A4q_RGDtDKyb3ck/edit?usp=sharing

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
