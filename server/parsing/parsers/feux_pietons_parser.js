import Parser from './master';
import asyncForEach from '../../tools/asyncForEach';
import dataset from '../../../datasets/feux_pieton.json';
import sequelize from '../../config/database';
import _ from 'lodash';
const FeuxPieton = sequelize.import('../../database/models/feuxpieton');

export default class FeuxPietonsParser extends Parser {
  async parse() {
    console.log('...parsing feux pietons...');
    await asyncForEach(dataset, async feuPieton => {
      //await FeuxPieton.create(feuPieton);
      await FeuxPieton.update(
        _.pick(feuPieton, ['Latitude', 'Longitude']) || {
          Latitude: null,
          Longitude: null,
        },
        {
          where: {
            Int_no: feuPieton.Int_no,
          },
        },
      );
    });
  }
}
