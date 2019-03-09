// AsyncForEach function.
import asyncForEach from '../tools/asyncForEach';

// List parsers here.
import AccidentParser from './parsers/accident_parser';
import SignauxSonoresParser from './parsers/signaux_sonores_parser';

// Parsing function.
const parse = async parser => await parser.parse();

// List of parsers.
new FeuxPietonsParser(), new SignauxSonoresParser();
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
