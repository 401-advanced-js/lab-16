'use strict';

const events = require('./events.js');
const {promisify} = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

events.on('readAndWrite', readAndWrite);
events.on('error', err => {throw err;});

let string = 'xdee';

/**
 * Takes in file path and uses it's contents to be stored in memory
 * @param {String} file 
 */
let read = function(file){
  console.log('we reading');
  readFileAsync(file, {encoding: 'utf8'})
    .then((text) => {
      string = text;
    })
    .catch(err => events.emit('error', err));
};

/**
 * Modifies the string in memory previously taken from the file
 */
function modify(){
  string = string.toString().toUpperCase();
}

/**
 * Writes the string in memory to the file that the string was taken in from
 * @param {String} file 
 */
function write(file){
  writeFileAsync( file, Buffer.from(string), (err, data) => {
    if(err) { events.emit('error', err); }
    console.log(`${file} saved`);
  });
}

/**
 * Event helper function that calls all three stages of the read, modify, and change functions
 * @param {String} file 
 */
async function readAndWrite(file){
  // read(file);
  modify();
  write(file);
}