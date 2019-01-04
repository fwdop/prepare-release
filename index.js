var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var semver = require('semver');
var path = require('path');
var ncp = require('ncp').ncp;

function filterDotFiles(path) {
  var pathParts = path.split('/');
  var filename = pathParts[pathParts.length - 1];
  if (filename[0] === '.') {
    return false;
  }
  return true;
}

function getCommitHash() {
  return require('child_process')
    .execSync('git rev-parse HEAD')
    .toString().trim();
}

module.exports = function (
  version, latest, input, output, onlyDeployMajor, ignoreDotFiles, deployCommitHash
) {
  var folderName = '';
  var options = {};

  if (version && !deployCommitHash) {
    semver.valid(version);
    if (onlyDeployMajor) {
      folderName = semver.major(version);
    } else {
      folderName = version;
    }
  }

  if (deployCommitHash) {
    folderName = getCommitHash();
  }

  if(ignoreDotFiles === true) {
    options.filter = filterDotFiles;
  }

  var pathToCreate = path.join(output, String(folderName));

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
