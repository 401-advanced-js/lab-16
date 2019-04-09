'use strict';

const events = require('./events.js');
require('./emethods.js');

/**
 * Takes in a file path from the command line
 * @param {String} file 
 */
const alterFile = (file) => {
  events.emit('readAndWrite', file);
};

let file = process.argv.slice(2).shift();
alterFile(file);

