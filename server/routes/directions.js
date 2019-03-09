import express from 'express';
import { CollisionRating, ProjetPietonnisationRating } from '../tools/ratings';
const router = express.Router();

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD7DRx9Ll0jGqzneZ1pE0v17rMe3MW6AQo',
  Promise: Promise,
});

router.get('/', async (req, res) => {
  let modeDeplacement = req.query.mode;
  let mode = 'walking';
  if (
    modeDeplacement === 'driving' &&
    modeDeplacement === 'walking' &&
    modeDeplacement === 'bicycling'
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

  for (let element of googleApiResponse.routes[0].legs[0].steps) {
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
  }

  return arrayOfRoad;
}

async function computeRatings(arrayOfRoad) {
  let ratings = {};
  let collision = {},
    projetPiteonnisation = {};

  const projetPietonnisationRating = new ProjetPietonnisationRating(),
    collisionRating = new CollisionRating();
  arrayOfRoad.forEach(async road => {
    let collisionRating = await collisionRating.getData(road);
    let projetsPietonnisationRating = await projetPietonnisationRating.getData(
      road,
    );
    road.ratings = null;

    if (collisionRating.length !== 0) {
      collision.postions = collisionRating;
      collision.rating = getRatingCollision(collisionRating.length);
      ratings.collision = collision;
      road.ratings = ratings;
    }
  });

  return arrayOfRoad;
}

export default router;
