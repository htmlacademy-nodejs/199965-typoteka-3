'use strict';

const version = require(`./version`);
const help = require(`./help`);
<<<<<<< HEAD
const generate = require(`./generate`);
=======
>>>>>>> d4fa6446d00554e89d4c7d648ffa05f7cbf3f040

const Cli = {
  [version.name]: version,
  [help.name]: help,
<<<<<<< HEAD
  [generate.name]: generate,
};

module.exports = {
  Cli,
=======
};

module.exports = {
  Cli
>>>>>>> d4fa6446d00554e89d4c7d648ffa05f7cbf3f040
};
