import React from "react";
//import fs from "fs";
import path from "path";
//import { renderToString } from "react-dom/server";
//import { StaticRouter } from "react-router-dom";
import App from "../src/App";
import FileSystemHelper from "../src/helper/FileSystem/FileSystemHelper";
import DiSsrHelper from "./SsrHelper/DiSsrHelper";
import { ChunkExtractor } from '@loadable/server'
import {
  pathToJsStaticDir,
  pathToWebpackStatsFile,
} from "./config/config"; 

 import {
  pathToPhpStaticDir as pathToPhpStaticDir_PurePhp,
  pathToJsRenderedPagesDir as pathToJsRenderedPagesDir_PurePhp,
  pathToPhpTemplatesDir as pathToPhpTemplatesDir_PurePhp,
  pathToHtmlPageTemplate
} from "./config/config.pure-php"; 

import {
  pathToPhpStaticDir,
  pathToJsRenderedPagesDir,
  pathToPhpTemplatesDir,
  pathToBaseTemplateFile,
  pathToBaseTemplateOnServerFile,
  pathToJsAssetManifestFile,
  pathToPhpAssetManifestFile, 
} from "./config/config.symfony";  

import SsrHelper, { ISsrHelper, Route } from "./SsrHelper/SsrHelper";
import { 
  homepageRoute,
  largePrintRoute,
  contactsRoute,
  portfolioRoute
} from "../src/data/routes_data";
import DiSsrPurePhpHelper from "./SsrHelper/DiSsrPurePhpHelper";

//create home page render file

const DYNAMIC_IMPORT = true;
const PURE_PHP = true;

const fs = new FileSystemHelper();

let ssrHelper: ISsrHelper = null;

const routes: Route[] = [
  homepageRoute,
  largePrintRoute,
  contactsRoute,
  portfolioRoute
]


if(DYNAMIC_IMPORT){

  const statsFile = path.resolve(pathToWebpackStatsFile);
  const extractor = new ChunkExtractor({ statsFile });

  if(PURE_PHP){

    ssrHelper = new DiSsrPurePhpHelper(
      <App />,
      routes,
      fs,
      extractor,
      pathToPhpStaticDir_PurePhp,
      pathToJsStaticDir,
      pathToJsRenderedPagesDir_PurePhp,
      pathToPhpTemplatesDir_PurePhp,
      pathToWebpackStatsFile,
      pathToHtmlPageTemplate
    );

  }else{

    ssrHelper =  new DiSsrHelper(
      <App />,
      routes,
      fs,
      extractor,
      pathToPhpStaticDir,
      pathToJsStaticDir,
      pathToJsRenderedPagesDir,
      pathToPhpTemplatesDir,
      pathToBaseTemplateFile,
      pathToBaseTemplateOnServerFile,
      pathToWebpackStatsFile
    ); 
  }
}else{

  ssrHelper =  new SsrHelper(
    <App />,
    routes,
    fs,
    pathToPhpStaticDir,
    pathToJsStaticDir,
    pathToJsRenderedPagesDir,
    pathToPhpTemplatesDir,
    pathToJsAssetManifestFile,
    pathToPhpAssetManifestFile
  ); 
}

ssrHelper.makeSsrReadyOnServer();