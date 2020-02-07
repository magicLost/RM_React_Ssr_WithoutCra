const path = require("path");

/* MUST MAKE PATHS FROM DIST/BUNDLE.JS FILE */

export const pathToJsStaticDir = path.resolve(
  __dirname, 
  "..",
  "..",
  "dist", 
  "static"
);


export const pathToWebpackStatsFile = path.resolve(
    __dirname,
    "..",
    "..",
    "dist",
    "loadable-stats.json"
);