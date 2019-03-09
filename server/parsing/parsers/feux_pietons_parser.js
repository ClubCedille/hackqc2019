import Parser from './master';
import asyncForEach from '../../tools/asyncForEach';
import dataset from '../../../datasets/feux_pieton.json';
import sequelize from '../../config/database';
const FeuxPieton = sequelize.import('../../database/models/feuxpieton');

export default class FeuxPietonsParser extends Parser {
  async parse() {
    console.log('...parsing feux pietons...');
    await asyncForEach(
      dataset,
      async feuPieton => await FeuxPieton.create(feuPieton),
    );
  }
}
