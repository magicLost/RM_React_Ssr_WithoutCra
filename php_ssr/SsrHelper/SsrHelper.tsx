//import * as rimraf from "rimraf";
//import { ncp } from "ncp";
//const { promisify } = require("util");
import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
//const fs = require("fs");
const path = require("path");
import {IFileSystemHelper} from "../../src/helper/FileSystem/FileSystemHelper";

export type Route = {
  path: string;
  fileName: string;
  title: string;
  metaDescriptionContent: string;
};



export interface ISsrHelper{

  app: JSX.Element;

  fs: IFileSystemHelper;

  pathToPhpStaticDir: string,
  pathToJsStaticDir: string,

  pathToJsRenderedPagesDir: string,
  pathToPhpTemplatesDir: string,


  makeSsrReadyOnServer: () => Promise<any>;

}

export interface ISimpleSsrHelper extends ISsrHelper {
  pathToJsAssetManifestFile: string,
  pathToPhpAssetManifestFile: string
}

class SsrHelper implements ISimpleSsrHelper {

  app: JSX.Element;

  routes: Route[];

  fs: IFileSystemHelper;

  pathToPhpStaticDir: string;
  pathToJsStaticDir: string;

  pathToJsRenderedPagesDir: string;
  pathToPhpTemplatesDir: string;
  
  pathToJsAssetManifestFile: string;
  pathToPhpAssetManifestFile: string;

  constructor(
    app: JSX.Element,
    routes: Route[],
    fs: IFileSystemHelper,
    pathToPhpStaticDir: string,
    pathToJsStaticDir: string,
    pathToJsRenderedPagesDir: string,
    pathToPhpTemplatesDir: string,
    pathToJsAssetManifestFile: string,
    pathToPhpAssetManifestFile: string
  ) {
    this.app = app;
    this.routes = routes;
    this.fs = fs;
    this.pathToPhpStaticDir = pathToPhpStaticDir;
    this.pathToJsStaticDir = pathToJsStaticDir;
    this.pathToJsRenderedPagesDir = pathToJsRenderedPagesDir;
    this.pathToPhpTemplatesDir = pathToPhpTemplatesDir;
    this.pathToJsAssetManifestFile = pathToJsAssetManifestFile;
    this.pathToPhpAssetManifestFile = pathToPhpAssetManifestFile;
  }

  makeSsrReadyOnServer = async () => {
    try {
      //delete dirs with old staff
      await this.fs.deleteDir(this.pathToPhpStaticDir);

      //copy dirs with new staff
      this.fs.copyDir(this.pathToJsStaticDir, this.pathToPhpStaticDir);

      //write templates files
      for (let route of this.routes) {
        //renderHtml
        let html = this.renderPage(route);
        //save rendered Template ???
        //makeTemplate
        let template = this.makePageTemplate(html, route.title);
        //saveTemplate
        this.fs.writeFile(
          path.join(this.pathToPhpTemplatesDir, `${route.fileName}.html.twig`),
          template
        );
      }

      //copy manifest file
      this.copyAssetManifest();

    } catch (err) {
      console.error("ERROR", err.message);
    }

  };

  renderPage = (route: Route) => {
      return renderToString(
        <StaticRouter location={route.path} context={{}}>
          {this.app}
        </StaticRouter>
      );
  };

  makePageTemplate = (html: string, title: string) => {
    return `
    {% extends "base.html.twig" %}

    {% block title %}${title}{% endblock %}
    
    {% block root %}
      ${html}
    {% endblock root %}
              `;
  }

  copyAssetManifest = () => {

    const cra_manifest = require(this.pathToJsAssetManifestFile);

    this.fs.writeFile(this.pathToPhpAssetManifestFile, JSON.stringify(cra_manifest));
  };
}

export default SsrHelper;




