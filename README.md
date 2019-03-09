# HackQC19-API

## How to run the project in dev

``` npm i && npm run dev ```

## How to run the parser

``` npm run parser ```

## How to deploy data to AWS

``` npm run aws ```

## How to add a parser

Simply go in the ```server/parsing/parsers``` folder and add a class similar to the one in the file named ```server/parsing/example_parser.js```.
Then, import your new file in the ```server/parsing/parser.js``` file and add a new instance of your class in the ```parsers``` array.

## Happy coding!