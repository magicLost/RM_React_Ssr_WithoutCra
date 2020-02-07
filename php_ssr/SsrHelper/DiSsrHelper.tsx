import {ISsrHelper, Route} from "./SsrHelper";
import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
//const fs = require("fs");
const path = require("path");
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import {IFileSystemHelper} from "../../src/helper/FileSystem/FileSystemHelper";


export interface IDynamicImportSsrHelper extends ISsrHelper{

  extractor: any;

  pathToBaseTemplateFile: string, 
  pathToBaseTemplateOnServerFile: string,

  pathToWebpackStatsFile: string

} 

class DiSsrHelper implements IDynamicImportSsrHelper {

  extractor: any;

  app: JSX.Element;

  routes: Route[];

  fs: IFileSystemHelper;

  pathToPhpStaticDir: string;
  pathToJsStaticDir: string;

  pathToJsRenderedPagesDir: string;
  pathToPhpTemplatesDir: string;

  pathToBaseTemplateFile: string;
  pathToBaseTemplateOnServerFile: string;

  pathToWebpackStatsFile: string

  constructor(
    app: JSX.Element,
    routes: Route[],
    fs: IFileSystemHelper,
    extractor: any,
    pathToPhpStaticDir: string,
    pathToJsStaticDir: string,
    pathToJsRenderedPagesDir: string,
    pathToPhpTemplatesDir: string,
    //pathToStatsFile: string,
    pathToBaseTemplateFile: string, 
    pathToBaseTemplateOnServerFile: string,
    pathToWebpackStatsFile: string
  ) {
    this.app = app;
    this.routes = routes;
    this.fs = fs;
    this.pathToPhpStaticDir = pathToPhpStaticDir;
    this.pathToJsStaticDir = pathToJsStaticDir;
    this.pathToJsRenderedPagesDir = pathToJsRenderedPagesDir;
    this.pathToPhpTemplatesDir = pathToPhpTemplatesDir;

    this.pathToBaseTemplateFile = pathToBaseTemplateFile; 
    this.pathToBaseTemplateOnServerFile = pathToBaseTemplateOnServerFile;

    this.pathToWebpackStatsFile = pathToWebpackStatsFile;

    //this.extractor = new ChunkExtractor({ statsFile });
    this.extractor = extractor;
  }

  makeSsrReadyOnServer = async () => {
    try {
      // delete dirs with old staff
      await this.fs.deleteDir(this.pathToPhpStaticDir);
      // remove old page templates
      await this.fs.deleteDir(this.pathToPhpTemplatesDir);
      // create dir for templates
      await this.fs.makeDir(this.pathToPhpTemplatesDir);

      //copy dirs with new staff
      this.fs.copyDir(this.pathToJsStaticDir, this.pathToPhpStaticDir);

      //write templates files
      for(let i = 0; i < this.routes.length; i++){

        const statsFile = path.resolve(this.pathToWebpackStatsFile);
        this.extractor = new ChunkExtractor({ statsFile });      

        const route = this.routes[i];

        //renderHtml
        let html = this.renderPage(route);

        //console.log(`[PATH] ${this.pathToJsRenderedPagesDir}/${route.fileName}.html`);

        //this.fs.writeFile(`${this.pathToJsRenderedPagesDir}/${route.fileName}.html`, html, true);

        //make and save base template file
        if(i === 0) this.makeAndSaveBaseTemplate();

        this.makeAndSavePageTemplate(html, route);
      }
    } catch (err) {
      console.error("ERROR", err.message);
    }

  };

  renderPage = (route: Route) => {
      return renderToString(
        <ChunkExtractorManager extractor={this.extractor}>
            <StaticRouter location={route.path} context={{}}>
                {this.app}
            </StaticRouter>
        </ChunkExtractorManager>
      );
  };

  //if isMain = true -> return tags that contains dataChunkName
  //if isMain = false -> return tags that not contains dataChunkName
  getTags = (dataChunkName: string, isMain: boolean, isJs: boolean): string => {

    const pageTags = [];

    const tags: string[] = isJs ? 
        this.extractor.getScriptTags().split("\n") : 
        this.extractor.getStyleTags().split("\n");

    for(let tag of tags){
        if(isMain === true){
            if(tag.indexOf(dataChunkName) !== -1){
                pageTags.push(tag);
            }
        }else{
            if(tag.indexOf(dataChunkName) === -1){
                pageTags.push(tag);
            }
        }
    }

    return pageTags.join("\n");
  }

  makeAndSavePageTemplate = async (html: string, route: Route) => {

    //get js without main js
    const pageJsTags = this.getTags('data-chunk="main"', false, true);
    
    //get css without main css
    const pageCssLinkTags = this.getTags('data-chunk="main"', false, false);

    const content = `
    {% extends "base.html.twig" %}
    
    {% block title %}${route.title}{% endblock %}

    {% block stylesheets %}
      ${pageCssLinkTags}
    {% endblock stylesheets %}

    {% block javascripts %}
      ${pageJsTags}
    {% endblock javascripts %}

    {% block root %}
      ${html}
    {% endblock root %}
              `;

    //this.pathToJsRenderedPagesDir
    this.fs.writeFile(
        `${this.pathToPhpTemplatesDir}/${route.fileName}.html.twig`, 
        content, 
        true
    );
  }

  makeAndSaveBaseTemplate = async (
      jsMark: string = "!!!main_script!!!",
      cssMark: string = "!!!main_css!!!"
  ) => {

    const mainJsTags: string = this.getTags('data-chunk="main"', true, true);
    const mainCssLinkTags: string = this.getTags('data-chunk="main"', true, false);

    let finalBaseTemplate = "";

    const baseTemplate: string = await this.fs.readFile(this.pathToBaseTemplateFile);

    finalBaseTemplate = baseTemplate.replace(jsMark, mainJsTags);

    finalBaseTemplate = finalBaseTemplate.replace(cssMark, mainCssLinkTags);

    this.fs.writeFile(this.pathToBaseTemplateOnServerFile, finalBaseTemplate, true);
    /* this.fs.writeFile(
        `${this.pathToJsRenderedPagesDir}/base.html.twig`, 
        finalBaseTemplate, 
        true
    ); */
  }
}

export default DiSsrHelper;