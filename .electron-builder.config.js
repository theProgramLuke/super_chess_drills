const version = process.env.npm_package_version;

if (version === undefined) {
  throw "Version must be specified.";
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: "com.electron.super_chess_drills",
  artifactName: "Super-Chess-Drills.${ext}",
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["packages/**/dist/**"],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
  linux: {
    target: "appImage",
  },
  win: {
    target: "portable",
  },
};

module.exports = config;
