import Parser from './master';
import asyncForEach from '../../tools/asyncForEach';
import dataset from '../../../datasets/signaux-sonore.json';
import sequelize from '../../config/database';
const SignauxSonores = sequelize.import(
  '../../database/models/signaux_sonores',
);

export default class SignauxSonoresParser extends Parser {
  async parse() {
    console.log('...parsing signaux sonores...');
    await asyncForEach(
      dataset,
      async signalsonore => await SignauxSonores.create(signalsonore),
    );
  }
}
