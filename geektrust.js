const fs = require("fs");
const main = require("./main");

/**
 * Entry function
 * Reads line from files & calls callback function main
 */
function driverCode() {
  try {
    if (process.argv.length < 3) {
      throw "No file name given";
    }
    const fileName = process.argv[2];
    fs.readFile(fileName, "utf8", main);
  } catch (err) {
    console.log(err);
  }
}

driverCode();