import sequelize from '../config/database';

const POW_FACTOR = 1.18;
const { Op } = sequelize;
const Accident = sequelize.import('../database/models/accident');
const ComptageFeu = sequelize.import('../database/models/comptage_feu');
const VehiculeFeuxPieton = sequelize.import('../database/models/feuxpieton');
const FeuxSonores = sequelize.import('../database/models/signaux_sonores.js');

export class MasterRating {
  /**
   *
   * @param {sequelize.Model<Any,Any>} model
   * @param {String} latitude
   * @param {String} longitude
   */
  constructor(model, latitude, longitude) {
    /**
     * @type {sequelize.Model<Any,Any>}
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
   * Fetch data from the
   *
   * @param {Object} road
   * @returns {Object}
   */
  async getData(road) {
    return await this.model.findAll({
      attributes: [this.latitude, this.longitude],
      where: {
        [this.latitude]: {
          [Op.between]: [road.start_location.lat, road.end_location.lat],
        },
        [this.longitude]: {
          [Op.between]: [road.start_location.lng, road.end_location.lng],
        },
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
}

export class ComptageVFeuxPietonRating extends MasterRating {
  constructor() {
    super(VehiculeFeuxPieton, 'Latitude', 'Longitude');
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

  /**
   * Fetch data from the
   *
   * @param {Object} road
   * @returns {Object}
   */
  async getData(road) {
    return await this.model.findAll({
      attributes: [this.latitude, this.longitude],
      where: {
        [this.latitude]: {
          [Op.between]: [
            road.start_location.lat - 0.002,
            road.end_location.lat + 0.002,
          ],
        },
        [this.longitude]: {
          [Op.between]: [
            road.start_location.lng - 0.002,
            road.end_location.lng + 0.002,
          ],
        },
      },
    });
  }
}
