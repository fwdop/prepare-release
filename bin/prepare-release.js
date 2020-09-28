#!/usr/bin/env node

var releasePrepare = require('../');
var argv = require('minimist')(process.argv.slice(2));

var onlyDeployMajor = argv['deploy-major'];
var version = argv.version;
var input = argv.input;
var output = argv.output;
var latest = argv.latest;
var ignoreDotFiles = !!argv['ignore-dot-files'];
var deployCommitHash = !!argv['deploy-commit-hash'];

if (!version && !deployCommitHash) {
  throw new Error('You must either specify a version with --version or use --deploy-commit-hash');
}
if (!input || !output) {
  throw new Error('--input and --output flags are mandatory!');
}

releasePrepare(version, latest, input, output, onlyDeployMajor, ignoreDotFiles, deployCommitHash);
