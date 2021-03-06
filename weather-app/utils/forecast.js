const request = require('request');
require('dotenv').config();

const WEATHER_KEY = process.env.WEATHER_KEY;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${WEATHER_KEY}&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        weather: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        preciptation: body.current.precip,
      });
    }
  });
};

module.exports = forecast;

// const forecast = ({ latitude, longitude }) => {
//   coordinates = `${latitude},${longitude}`;
//   const API_KEY = process.env.API_KEY;
//   const API_URL = 'http://api.weatherstack.com';
//   const url = `${API_URL}/current?access_key=${API_KEY}&query=${coordinates}&units=m`;

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       console.log('Unable to connect to waether service!');
//     } else if (response.body.error) {
//       console.log('Unable to find location');
//     } else {
//       const temperature = response.body.current.temperature;
//       const precip = response.body.current.precip;
//       const feellLike = response.body.current.feelslike;
//       const description = response.body.current.weather_descriptions[0];

//       console.log(
//         chalk.inverse(
//           `It is currently ${description}, ${temperature} ceusius degrees out, but it feels like ${feellLike} ceusius degreess out. There is a ${precip}% chance of rain.`
//         )
//       );
//     }
//   });
// };
