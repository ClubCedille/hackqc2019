import sequelize from '../config/database';
const POW_FACTOR = 1.18;
const { Op } = sequelize;
const Accident = sequelize.import('../database/models/accident');
const ProjetPietonnisation = sequelize.import(
  '../database/models/projet_pietonnisation',
);

class MasterRating {
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
   * @returns {Number}
   */
  getRating() {
    throw new Error('You must implement this method.');
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

export class ProjetPietonnisationRating extends MasterRating {
  constructor() {
    super(ProjetPietonnisation, 'LATITUDE', 'LONGITUDE');
  }

  getRating() {}
}

export class CollisionRating extends MasterRating {
  constructor() {
    super(Accident, 'LOC_LAT', 'LOC_LONG');
  }

  /**
   * Get rating of collision.
   * @param {Number} numberCollision
   */
  getRating(numberCollision) {
    let rating = 100 - Math.pow(numberCollision, POW_FACTOR);
    if (rating <= 0) {
      return 0;
    }
    return rating;
  }
}
