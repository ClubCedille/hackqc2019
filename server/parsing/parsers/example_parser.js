import Parser from "./master";
import fs from "fs";
import dataset from "../../../datasets/example_dataset.json";

export default class ExampleParser extends Parser {
  async parse() {
    // 1- Parser definition goes here.
    // 2- Parse file here.
    console.log("...parsing...");
    console.log(dataset);
  }
}
