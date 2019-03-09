import express from 'express';
const router = express.Router();
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDagDGSn2btc_jP5KgOuk7QOZPuwnv0hMA',
  Promise: Promise,
});

router.get('/', async (req, res) => {
  let modeDeplacement = req.query.mode;
  let mode = 'driving';
  if (
    modeDeplacement == 'driving' &&
    modeDeplacement == 'walking' &&
    modeDeplacement == 'bicycling'
  ) {
    mode = modeDeplacement;
  }

  res.json(await querygoogleapi(req.query.origin, req.query.destination, mode));
});

async function querygoogleapi(origin, destination, modeDeplacement) {
  try {
    let googleApiResponse = await requestGoogleApi(
      origin,
      destination,
      modeDeplacement,
    );
    let arrayOfRoutes = getDirectionRoutes(googleApiResponse.json);
    let ratings = computeRatings(arrayOfRoutes);

    return arrayOfRoutes;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function requestGoogleApi(origin, destination, modeDeplacement) {
  return googleMapsClient
    .directions({
      origin: origin,
      destination: destination,
      mode: modeDeplacement,
    })
    .asPromise();
}

/**
 * recover only the location of routes of only one direction
 * @param {response from google api} googleApiResponse
 */
function getDirectionRoutes(googleApiResponse) {
  let arrayOfRoutes = [];
  let routeObject = {};
  let startLocation = {};
  let endLocation = {};

  googleApiResponse.routes[0].legs[0].steps.forEach(element => {
    startLocation.lat = element.start_location.lat;
    startLocation.lng = element.start_location.lng;
    endLocation.lat = element.end_location.lat;
    endLocation.lng = element.end_location.lng;

    routeObject.start = startLocation;
    routeObject.end = endLocation;

    arrayOfRoutes.push(routeObject);
  });

  return arrayOfRoutes;
}

function computeRatings(arrayOfRoutes) {
  arrayOfRoutes.forEach(element => {});
}
export default router;
