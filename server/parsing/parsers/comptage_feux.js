import Parser from './master';
import asyncForEach from '../../tools/asyncForEach';
import sequelize from '../../config/database';
const { features } = JSON.parse(
  JSON.stringify(require('../../../datasets/comptages_feux.json')),
);
const ComptageFeu = sequelize.import('../../database/models/comptage_feu');

export default class ComptageFeuxParser extends Parser {
  async parse() {
    console.log('...parsing comptage feux...');
    await asyncForEach(
      features,
      async ({ properties }) => await ComptageFeu.create(properties),
    );
  }
}
