var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var semver = require('semver');
var path = require('path');
var ncp = require('ncp').ncp;

module.exports = function(version, input, output, onlyDeployMajor) {
  semver.valid(version);

  var versionToDeploy = version;
  if(onlyDeployMajor) {
    versionToDeploy = semver.major(version);
  }

  var pathToCreate = path.join(output, versionToDeploy + '');

  rimraf.sync(pathToCreate);
  mkdirp.sync(pathToCreate);

  ncp(path.join(input), pathToCreate, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('done!');
  });
};
