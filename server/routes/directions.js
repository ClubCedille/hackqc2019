import express from 'express';
import asyncForEach from '../tools/asyncForEach';
import {
  CollisionRating,
  ComptageVFeuxPietonRating,
  FeuxSonoresRating,
  MasterRating,
  ComptageFeuxRating,
} from '../tools/ratings';
const router = express.Router();

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD7DRx9Ll0jGqzneZ1pE0v17rMe3MW6AQo',
  Promise: Promise,
});

router.get('/', async (req, res) => {
  let modeDeplacement = 'walking';
  let constraintsToUse = [];
  const { mode, constraints } = req.query;

  if (['driving', 'walking', 'bicycling'].includes(mode)) {
    modeDeplacement = mode;
  } else {
    return res.status(406).json({
      error: 'You must pass driving, walking or bicycling as mode (STRICTLY).',
    });
  }

  // Make sure that if constraints is set, it is of type Array.
  if (constraints && !(constraints instanceof Array)) {
    return res.status(406).json({ error: 'contraints must be an array.' });
  } else if (constraints instanceof Array) {
    if (
      constraints.includes('family') ||
      constraints.includes('reducedmobility') ||
      constraints.includes('blind')
    ) {
      constraintsToUse = constraints;
    } else {
      return res.status(406).json({
        error:
          'constraints must include family, reducedmobility or blind (STRICTLY).',
      });
    }
  }

  console.log(constraintsToUse, modeDeplacement);

  res.json(
    await querygoogleapi(
      req.query.nightplannorigin,
      req.query.destination,
      modeDeplacement,
      constraintsToUse,
    ),
  );
});

async function querygoogleapi(
  origin,
  destination,
  modeDeplacement,
  constraints = [],
) {
  try {
    // Google response.
    const googleApiResponse = await requestGoogleApi(
      origin,
      destination,
      modeDeplacement,
    );

    // Ratings.
    return await computeRatings(
      googleApiResponse.json.routes,
      constraints || [],
      modeDeplacement,
    );
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
      alternatives: true,
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
const addFeuxRatingToRatings = (
  feuxSonores,
  feuxNormaux,
  rating,
  road,
  key,
) => {
  if (feuxSonores.length > 0) {
    let ratings = {};
    let toAdd = {};
    toAdd['postions'] = feuxSonores;
    toAdd['rating'] = rating.getRating(feuxSonores.length, feuxNormaux);
    ratings[key] = toAdd;
    road['ratings'] = ratings;
  }
};

async function computeRatings(arrayOfRoads, constraints = [], modeDeplacement) {
  let allRoads = [];

  const collisionRating = new CollisionRating(),
    comptageFeuxRating = new ComptageFeuxRating(),
    feuxSonoresRating = new FeuxSonoresRating(),
    comptageVFeuxPietonRating = new ComptageVFeuxPietonRating();
  await asyncForEach(arrayOfRoads, async roads => {
    let oneRoad = [];
    await asyncForEach(roads.legs[0].steps, async road => {
      let roadSergment = {};
      roadSergment['collision'] = 100;
      roadSergment['feupieton'] = 0;
      roadSergment['vehiculepietion'] = 100;
      roadSergment['feuxsonores'] = 100;

      const nbOfRoads = roads.legs[0].steps.length;

      let collisionsTrouves = await collisionRating.getData(road);
      let comptageFeuxTrouves = await comptageFeuxRating.getData(road);
      let feuxSonoresTrouves = await feuxSonoresRating.getData(road);
      let comptageVFeuxPietonTrouves = await comptageVFeuxPietonRating.getData(
        road,
      );

      if (constraints.length > 0 || modeDeplacement === 'bicycling') {
        const conditionToRunCollision =
          constraints.includes('family') ||
          constraints.includes('reducedmobility') ||
          constraints.includes('blind');

        const conditionToRunFeuPieton =
          constraints.includes('family') ||
          constraints.includes('reducedmobility');

        const conditionToRunComptageVehiculesPietons =
          constraints.includes('reducedmobility') ||
          constraints.includes('blind');

        const conditionToRunFeuxSonores = constraints.includes('blind');

        if (conditionToRunCollision) {
          roadSergment['collision'] = collisionRating.getRating(
            collisionsTrouves.length,
          );
        }

        if (conditionToRunFeuPieton) {
          roadSergment['feupieton'] = comptageFeuxRating.getRating(
            comptageFeuxTrouves.length,
          );
        }

        if (conditionToRunComptageVehiculesPietons) {
          roadSergment['vehiculepietion'] = comptageVFeuxPietonRating.getRating(
            comptageVFeuxPietonTrouves.length,
          );
        }

        if (conditionToRunFeuxSonores) {
          roadSergment['feuxsonores'] = feuxSonoresRating.getRating(
            feuxSonoresTrouves.length,
            nbOfRoads,
          );
        }
        oneRoad.push(roadSergment);
      }
    });
    allRoads.push(oneRoad);
  });

  return allRoads;
}

export default router;
