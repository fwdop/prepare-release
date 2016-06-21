# prepare-release

This package is meant to use in your npm scripts.

## Usage


```
"scripts": {
  "create-release-travis": "prepare-release --version $npm_package_version --input ./dist --output ./release"
}
```

This will read the contents from `./dist`, create a
new folder `./release/VERSION` and copy the contents
of `./dist` to this new directory.

## Flags

### `--input` (mandatory)

The folder where your built files are

### `--output` (mandatory)

The folder that is created by this package

### `--version` (mandatory)

The version you want to publish. Typically this will be `$npm_package_version`

### `--deploy-major` (optional)

Only deploy the master version. This will create folder that is only named after the major version

### `--ignore-dot-files` (optional)

Ignore dot files that are present in the input folder
