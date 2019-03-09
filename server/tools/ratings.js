import sequelize from '../config/database';
const POW_FACTOR = 1.35;
const { Op } = sequelize;
const Accident = sequelize.import('../database/models/accident');
const ProjetPietonnisation = sequelize.import(
  '../database/models/projet_pietonnisation',
);

class MasterRating {
  constructor() {
    /**
     * @type {sequelize.Model<Any,Any>}
     */
    this.model = undefined;

    /**
     * Name of the latitude field.
     * @type {String}
     */
    this.latitude = '';

    /**
     * Name of the longitude field.
     * @type {String}
     */
    this.longitude = '';
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
          [Op.between]: [road.start.lat, road.end.lat],
        },
        [this.longitude]: {
          [Op.between]: [road.start.lng, road.end.lng],
        },
      },
    });
  }
}

export class ProjetPietonnisationRating extends MasterRating {
  constructor() {
    this.model = ProjetPietonnisation;
    this.latitude = 'LATITUDE';
    this.longitude = 'LONGITUDE';
  }

  getRating() {}
}

export class CollisionRating extends MasterRating {
  constructor() {
    this.model = Accident;
    this.latitute = 'LOC_LAT';
    this.longitude = 'LOC_LNG';
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
