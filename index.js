var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var semver = require('semver');
var path = require('path');
var ncp = require('ncp').ncp;

module.exports = function(version, latest, input, output, onlyDeployMajor, ignoreDotFiles) {
  semver.valid(version);

  var versionToDeploy = version;
  var options = {};

  if(onlyDeployMajor) {
    versionToDeploy = semver.major(version);
  }

  if(ignoreDotFiles === true) {
    options.filter = function(path) {
      var pathParts = path.split('/');
      var filename = pathParts[pathParts.length - 1];
      if (filename[0] === '.') {
        return false;
      }
      return true;
    };
  }

  var pathToCreate = path.join(output, versionToDeploy + '');

  rimraf.sync(pathToCreate);
  mkdirp.sync(pathToCreate);

  ncp(path.join(input), pathToCreate, options, function(err) {
    if (err) {
      return console.error(err);
    }
  });

  if (latest) {
    var pathToLatest = path.join(latest);

    rimraf.sync(pathToLatest);
    mkdirp.sync(pathToLatest);

    ncp(path.join(input), pathToLatest, options, function(err) {
      if (err) {
        return console.error(err);
      }
    });
  }

  console.log('done!');
};
