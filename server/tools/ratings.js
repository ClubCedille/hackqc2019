import sequelize from '../config/database';

const POW_FACTOR = 1.18;
const OFFSET = 0.002;
const { Op } = sequelize;
const Accident = sequelize.import('../database/models/accident');
const ComptageFeu = sequelize.import('../database/models/comptage_feu');
const VehiculeFeuxPieton = sequelize.import('../database/models/feuxpieton');
const FeuxSonores = sequelize.import('../database/models/signaux_sonores.js');

export class MasterRating {
  /**
   *
   * @param {sequelize.Model} model
   * @param {String} latitude
   * @param {String} longitude
   */
  constructor(model, latitude, longitude) {
    /**
     * @type {sequelize.Model}
     */
    this.model = model;

    /**
     * Name of the latitude field.
     * @type {String}
     */
    this.latitude = latitude;

    /**
     * Name of the longitude field.
     * @type {String}
     */
    this.longitude = longitude;
  }

  /**
   * Get the rating of a model.
   * @param {Number} length
   * @returns {Number}
   */
  getRating(length) {
    let rating = 100 - Math.pow(length, POW_FACTOR);
    if (rating <= 0) {
      return 0;
    }
    return Math.round(rating);
  }

  /**
   * Fetch data from the model's table.
   *
   * @param {Object} road
   * @returns {Object}
   */
  async getData(road, columns = [], whereCondition = {}) {
    return await this.model.findAll({
      attributes: [this.latitude, this.longitude, ...columns],
      where: {
        [this.latitude]: {
          [Op.between]: [
            road.start_location.lat - OFFSET,
            road.end_location.lat + OFFSET,
          ],
        },
        [this.longitude]: {
          [Op.between]: [
            road.start_location.lng - OFFSET,
            road.end_location.lng + OFFSET,
          ],
        },
        ...whereCondition,
      },
    });
  }
}

export class CollisionRating extends MasterRating {
  constructor() {
    super(Accident, 'LOC_LAT', 'LOC_LONG');
  }
}

export class ComptageFeuxRating extends MasterRating {
  constructor() {
    super(ComptageFeu, 'Latitude', 'Longitude');
  }

  getRating(length) {
    // Cyclistes: plus y'a de passages, plus la note est basse
    // Pietons: plys y'a de velos, plus la note est passe (COULD)
    // Handicapes/Aveugles: Faut qu'il y ait le moins personnes possible.
  }
}

export class ComptageVFeuxPietonRating extends MasterRating {
  constructor() {
    super(VehiculeFeuxPieton, 'Latitude', 'Longitude');
  }

  getRating(length) {
    // plus y'a de vehicules, plus la note est basse.
    // pour les Handicapes/Aveugles: Plus y'a de personnes, plus la note est basse
  }
}

export class FeuxSonoresRating extends MasterRating {
  constructor() {
    super(FeuxSonores, 'latitude', 'longitude');
  }

  /**
   * Get the rating of a Feux model.
   * @param {Number} feuxSonores
   * @param {Number} feuxNormaux
   * @returns {Number}
   */
  getRating(feuxSonores, nbIntersections) {
    let rating = (feuxSonores / nbIntersections) * 100;
    if (rating <= 0) {
      return 0;
    }
    if (rating >= 100) {
      rating = 100;
    }
    return Math.round(rating);
  }
}
