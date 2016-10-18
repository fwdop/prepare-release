#!/usr/bin/env node

var releasePrepare = require('../');
var argv = require('optimist').argv;

var onlyDeployMajor = argv['deploy-major'];
var version = argv.version;
var input = argv.input;
var output = argv.output;
var latest = argv.latest;
var ignoreDotFiles = !!argv['ignore-dot-files'];

if (!version || !input || !output) {
  throw new Error('--version, --input and --output flags are mandatory!');
}

releasePrepare(version, latest, input, output, onlyDeployMajor, ignoreDotFiles);
