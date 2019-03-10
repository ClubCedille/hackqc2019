import express from 'express';
import asyncForEach from '../tools/asyncForEach';
import { CollisionRating, ProjetPietonnisationRating } from '../tools/ratings';
const router = express.Router();

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD7DRx9Ll0jGqzneZ1pE0v17rMe3MW6AQo',
  Promise: Promise,
});

router.get('/', async (req, res) => {
  let modeDeplacement = req.query.mode;
  let mode = 'walking';
  if (['driving', 'walking', 'bicycling'].includes(modeDeplacement)) {
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
  let collision = {},
    projetPiteonnisation = {};
  let arayOfRatings = [];
  var i = 0;
  const projetPietonnisationRating = new ProjetPietonnisationRating(),
    collisionRating = new CollisionRating();

  await asyncForEach(arrayOfRoad, async road => {
    arayOfRatings[i] = null;
    let collisionsTrouves = await collisionRating.getData(road);
    let projetsPietonnisationRating = await projetPietonnisationRating.getData(
      road,
    );

    if (collisionsTrouves.length > 0) {
      arayOfRatings[i] = collisionRating.getRating(collisionsTrouves.length);
    }
    i++;
  });

  return arayOfRatings;
}

export default router;
