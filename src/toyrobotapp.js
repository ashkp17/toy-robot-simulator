#!/usr/bin/env node

const communication = require('./communication.js');
const instructions = require('./instructions.js');
const describe = require('./describe.js');

/**
 * To receive input command from user continuously, until user explicity terminate the program
 */
const readInput = () => {
  let expinp = process.openStdin();
  let coordinate = [0, 0];
  let direction = '';
  let round = 0;

  expinp.addListener('data', function(d) {
    let command = d
      .toString()
      .trim()
      .toUpperCase();

    let isValid = instructions.isCorrectCmd(round, command);

    if (isValid) {
      if (instructions.isCmdtyOf('PLACE', command)) {
        [newCoordinateX, newCoordinateY, newDirection, isValid] = instructions.execute(command);

        if (isValid) {
          coordinate[0] = newCoordinateX;
          coordinate[1] = newCoordinateY;
          direction = newDirection;
        }
      } else {
        [coordinate, direction] = instructions.execute(command, coordinate, direction);
      }

      if (isValid) {
        round++;
      }
    }
  });
};


  // To start prgm
 
const strt = () => {
  describe.prCaption();
  describe.prDetail();
  readInput();
};

strt();
