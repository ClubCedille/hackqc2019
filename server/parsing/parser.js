// AsyncForEach function.
import asyncForEach from '../tools/asyncForEach';

// List parsers here.
import AccidentParser from './parsers/accident_parser';
import FeuxPietonsParser from './parsers/feux_pietons_parser';
import ComptageFeuxParser from './parsers/comptage_feux';

// Parsing function.
const parse = async parser => await parser.parse();

// List of parsers.
const parsers = [
  new AccidentParser(),
  new ComptageFeuxParser(),
  new FeuxPietonsParser(),
];

// Parse data.
(async () => await asyncForEach(parsers, parse))()
  .then(() => process.abort())
  .catch(() => process.abort());
