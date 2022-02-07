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
  linux: {
    target: "appImage",
  },
  win: {
    target: "portable",
  },
};

module.exports = config;
