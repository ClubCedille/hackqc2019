// AsyncForEach function.
import asyncForEach from '../tools/asyncForEach';

// List parsers here.
import ExampleParser from './parsers/example_parser';
import AccidentParser from './parsers/accident_parser';

// Parsing function.
const parse = async parser => await parser.parse();

// List of parsers.
const parsers = [new AccidentParser()];

// Parse data.
(async () => {
  await asyncForEach(parsers, parse);
})();

// Quit program.
process.exit(0);
