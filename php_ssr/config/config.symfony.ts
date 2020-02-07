const path = require("path");

/* MUST MAKE PATHS FROM DIST/BUNDLE.JS FILE */

export const pathToPhpStaticDir = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "Symfony",
  "RM_Symfony_Ssr",
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

export const pathToJsRenderedPagesDir = path.resolve(__dirname, "..", "renderedPages", "symfony");

export const pathToPhpTemplatesDir = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "Symfony",
  "RM_Symfony_Ssr",
  "templates",
  "home"
);

export const pathToJsAssetManifestFile = path.resolve(
  __dirname,
  "manifest.json"
);

export const pathToPhpAssetManifestFile = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "Symfony",
  "RM_Symfony_Ssr",
  "public",
  "assets-manifest.json"
);

export const pathToBaseTemplateFile = path.resolve(
  __dirname,
  "..",
  "..",
  "config",
  "base.template.html.twig"
);

export const pathToBaseTemplateOnServerFile = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "Symfony",
  "RM_Symfony_Ssr",
  "templates",
  "base.html.twig"
);

export const pathToWebpackStatsFile = path.resolve(
  __dirname,
  "..",
  "..",
  "dist",
  "loadable-stats.json"
);
