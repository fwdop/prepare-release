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

### `--latest` (optional)

This will create an additional folder containing the same artifacts as output.

### `--deploy-major` (optional)

Only deploy the major version. This will create a folder that is only named after the major version.

### `--ignore-dot-files` (optional)

Ignore dot files that are present in the input folder
