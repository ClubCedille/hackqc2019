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
    let ratings = await computeRatings(arrayOfRoutes);

    return ratings;
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
  let arrayOfRoad = [];
  let roadObject = {};
  let startLocation = {};
  let endLocation = {};

  googleApiResponse.routes[0].legs[0].steps.forEach(element => {
    startLocation.lat = element.start_location.lat;
    startLocation.lng = element.start_location.lng;
    endLocation.lat = element.end_location.lat;
    endLocation.lng = element.end_location.lng;

    roadObject.start = startLocation;
    roadObject.end = endLocation;

    arrayOfRoad.push(routeObject);
  });

  return arrayOfRoad;
}

async function computeRatings(arrayOfRoad) {
  let ratings = {};
  let collision = {};
  arrayOfRoad.forEach(async road => {
    let collisionRating = await getCollisions(road);
    road.ratings = null;

    if (collisionRating.length != 0) {
      collision.postions = collisionRating;
      collision.rating = getRatingCollision(collisionRating.length);
      ratings.collision = collision;
      road.ratings = ratings;
    }
  });

  return arrayOfRoad;
}

async function getCollisions(road) {
  return await Table.findAll({
    attributes: ['LOC_LAT', 'LOC_LONG'],
    where: {
      LOC_LAT: {
        [Op.between]: [road.start.lat, road.end.lat],
      },
      LOC_LONG: {
        [Op.between]: [road.start.lng, road.end.lng],
      },
    },
  });
}

export default router;
