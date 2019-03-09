// AsyncForEach function.
import asyncForEach from '../tools/asyncForEach';

// List parsers here.
import AccidentParser from './parsers/accident_parser';
import ComptageFeuxParser from './parsers/comptage_feux';
import FeuxPietonsParser from './parsers/feux_pietons_parser';
import SignauxSonoresParser from './parsers/signaux_sonores_parser';

// Parsing function.
const parse = async parser => await parser.parse();

// List of parsers.
const parsers = [
  new AccidentParser(),
  new ComptageFeuxParser(),
  new FeuxPietonsParser(),
  new SignauxSonoresParser(),
];

// Parse data.
(async () => await asyncForEach(parsers, parse))()
  .then(() => process.abort())
  .catch(() => process.abort());
