const SsrHelper = require("./SsrHelper/SsrHelper.js").default;
const path = require("path");

const ssrHelper = new SsrHelper();
const pathToPhpStaticDir = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "Symfony",
  "RM_Symfony_Ssr",
  "public",
  "static"
);

const pathToCraStaticDir = path.join(__dirname, "..", "dist", "static");

const pathToCraRenderedPagesDir = path.join(__dirname, "renderedPages");

const pathToPhpTemplatesDir = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "Symfony",
  "RM_Symfony_Ssr",
  "templates",
  "home"
);

const pathToCraAssetManifestFile = path.join(
  __dirname,
  "..",
  "dist",
  "manifest.json"
);
const pathToPhpAssetManifestFile = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "Symfony",
  "RM_Symfony_Ssr",
  "public",
  "assets-manifest.json"
);

ssrHelper.lastSteps(
  pathToPhpStaticDir,
  pathToCraStaticDir,
  pathToCraRenderedPagesDir,
  pathToPhpTemplatesDir,
  pathToCraAssetManifestFile,
  pathToPhpAssetManifestFile
);

//test
/* ssrHelper.test("hello", err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Say hello.`);
}); */

//ssrHelper.writeTemplates(pathToCraRenderedPagesDir, pathToPhpTemplatesDir);
/* ssrHelper.copyAssetManifest(
  pathToCraAssetManifestFile,
  pathToPhpAssetManifestFile
); */
//ssrHelper.copyDir(pathToCraStaticDir, pathToPhpStaticDir);

//delete dirs with old staff
//ssrHelper.deleteDir(pathToPhpStaticDir);

//copy dirs with new staff
//ssrHelper.copyDir(pathToCraStaticDir, pathToPhpStaticDir);

//write templates files

//re-write manifest.json file
