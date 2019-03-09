import express from 'express';
import sequelize from '../config/database';
import asyncForEach from '../tools/asyncForEach';
const router = express.Router();
const POW_FACTOR = 1.18;
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

    let ratings = await computeRatings(
      googleApiResponse.json.routes[0].legs[0].steps,
    );

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
async function computeRatings(arrayOfRoad) {
  await asyncForEach(arrayOfRoad, async road => {
    road['ratings'] = null;
    let collisionsTrouves = await getCollisions(road);

    if (collisionsTrouves.length > 0) {
      let ratings = {};
      let collision = {};
      collision['postions'] = collisionsTrouves;
      collision['rating'] = getRatingCollision(collisionsTrouves.length);
      ratings['collision'] = collision;
      road['ratings'] = ratings;
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
    let accidents = await Accident.findAll({
      attributes: ['LOC_LAT', 'LOC_LONG'],
      where: {
        LOC_LAT: {
          [Op.between]: [road.start_location.lat, road.end_location.lat],
        },
        LOC_LONG: {
          [Op.between]: [road.start_location.lng, road.end_location.lng],
        },
      },
    });
    return accidents;
  } catch (error) {
    console.log('error' + error);
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
