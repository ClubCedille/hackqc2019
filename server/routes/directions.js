import express from 'express';
import sequelize from '../config/database';
const router = express.Router();
const POW_FACTOR = 1.35;
const Accident = sequelize.import('../database/models/accident');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD7DRx9Ll0jGqzneZ1pE0v17rMe3MW6AQo',
  Promise: Promise,
});
const Op = sequelize.Op;

router.get('/', async (req, res) => {
  let modeDeplacement = req.query.mode;
  let mode = 'walking';
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

  googleApiResponse.routes[0].legs[0].steps.forEach(element => {

    let roadObject = {};
    let startLocation = {};
    let endLocation = {};

    startLocation.lat = element.start_location.lat;
    startLocation.lng = element.start_location.lng;
    endLocation.lat = element.end_location.lat;
    endLocation.lng = element.end_location.lng;

    roadObject.start = startLocation;
    roadObject.end = endLocation;

    arrayOfRoad.push(roadObject);
  });

  return arrayOfRoad;
}

async function computeRatings(arrayOfRoad) {
  let ratings = {};
  let collision = {};
  arrayOfRoad.forEach(async road => {
    let collisionRating = await getCollisions(road);
    console.log(collisionRating);
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
/**
 * get collisin from database that are beside the directions
 * @param {*} road
 */
async function getCollisions(road) {
  try {
    return await Accident.findAll({
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
  } catch (error) {
    console.log(error);
    return error;
  }
}
/**
 * calculate collision rating
 * @param {*} numberCollision
 */
function getRatingCollision(numberCollision) {
  let rating = 100 - Math.pow(numberCollision, POW_FACTOR);
  if (rating <= 0) {
    return 0;
  }
  return rating;
}

async function getFeuxPietons() {}

async function getFeuxMalvoyants() {}

async function getTaillesTrotoires() {}
export default router;
