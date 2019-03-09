import Parser from './master';
import asyncForEach from '../../tools/asyncForEach';
import dataset from '../../../datasets/accidents.json';
import _ from 'lodash';
import sequelize from '../../config/database';
const Accident = sequelize.import('../../database/models/accident');

export default class AccidentParser extends Parser {
  async parse() {
    // 1- Parser definition goes here.
    // 2- Parse file here.
    console.log('...parsing accident...');

    await asyncForEach(
      dataset,
      async accident => await Accident.create(_.omit(accident, [''])),
    );
  }
}
