import express from 'express';
import asyncForEach from '../tools/asyncForEach';
import {
  CollisionRating,
  ProjetPietonnisationRating,
  MasterRating,
} from '../tools/ratings';
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
    // Google response.
    const googleApiResponse = await requestGoogleApi(
      origin,
      destination,
      modeDeplacement,
    );

    // Ratings.
    return await computeRatings(googleApiResponse.json.routes[0].legs[0].steps);
  } catch (error) {
    console.log(error);
    return error;
  }
}

const requestGoogleApi = (origin, destination, modeDeplacement) => {
  return googleMapsClient
    .directions({
      origin: origin,
      destination: destination,
      mode: modeDeplacement,
    })
    .asPromise();
};

/**
 *
 * @param {Array} foundData
 * @param {MasterRating} rating
 * @param {Object} road
 * @param {String} key
 */
const addRatingToRatings = (foundData, rating, road, key) => {
  if (foundData.length > 0) {
    let ratings = {};
    let toAdd = {};
    toAdd['postions'] = foundData;
    toAdd['rating'] = rating.getRating(foundData.length);
    ratings[key] = toAdd;
    road['ratings'] = ratings;
  }
};

async function computeRatings(arrayOfRoad) {
  const projetPietonnisationRating = new ProjetPietonnisationRating(),
    collisionRating = new CollisionRating();

  await asyncForEach(arrayOfRoad, async road => {
    road['ratings'] = null;
    let collisionsTrouves = await collisionRating.getData(road);
    let projetsPietonnisationTrouves = await projetPietonnisationRating.getData(
      road,
    );

    addRatingToRatings(collisionsTrouves, collisionRating, road, 'collision');

    addRatingToRatings(
      projetsPietonnisationTrouves,
      projetPietonnisationRating,
      road,
      'projetPietonnisation',
    );
  });

  return arrayOfRoad;
}

export default router;
