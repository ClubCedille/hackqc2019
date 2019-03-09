import Parser from './master';
import asyncForEach from '../../tools/asyncForEach';
import dataset from '../../../datasets/accidents.json';
import sequelize from '../../config/database';
const Accident = sequelize.import('../../database/models/accident');

export default class AccidentParser extends Parser {
  async parse() {
    console.log('...parsing accident...');
    await asyncForEach(
      dataset,
      async accident => await Accident.create(accident),
    );
  }
}
