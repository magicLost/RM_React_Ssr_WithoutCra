const path = require("path");

/* MUST MAKE PATHS FROM DIST/BUNDLE.JS FILE */

export const pathToPhpStaticDir = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "Symfony",
  "RM_PurePhp",
  "public",
  "static"
);

/* export const pathToJsStaticDir = path.resolve(
  __dirname, 
  "..",
  "..",
  "dist", 
  "static"
); */

export const pathToHtmlPageTemplate = path.resolve(__dirname, "..", "..", "config", "base-pure.template.html");

export const pathToJsRenderedPagesDir = path.resolve(__dirname, "..", "renderedPages", "purePhp");

export const pathToPhpTemplatesDir = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "Symfony",
  "RM_PurePhp",
  "src",
  "pages",
  "pages"
);



