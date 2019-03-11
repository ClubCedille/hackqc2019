# HackQC19-API


![hackqc_gagnants_1](https://user-images.githubusercontent.com/25652765/54165021-3f1aba00-441c-11e9-998c-6008d45700e1.JPG)


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
