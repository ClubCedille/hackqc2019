import Parser from './master';
import asyncForEach from '../../tools/asyncForEach';
import dataset from '../../../datasets/projetpietonnisation2017.json';
import sequelize from '../../config/database';
const ProjetPietonnisation = sequelize.import(
  '../../database/models/projet_pietonnisation',
);

export default class ProjetPietonnisationParser extends Parser {
  async parse() {
    console.log('...parsing projet pietonnisation...');
    await asyncForEach(
      dataset,
      async projet => await ProjetPietonnisation.create(projet),
    );
  }
}
