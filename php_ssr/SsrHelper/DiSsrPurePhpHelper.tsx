import {ISsrHelper, Route} from "./SsrHelper";
import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
//const fs = require("fs");
const path = require("path");
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import {IFileSystemHelper} from "../../src/helper/FileSystem/FileSystemHelper";


export interface IDynamicImportSsrPurePhpHelper extends ISsrHelper{

    extractor: any;

    pathToWebpackStatsFile: string;

    pathToHtmlPageTemplate: string;

} 

class DiSsrPurePhpHelper implements IDynamicImportSsrPurePhpHelper {

    extractor: any;

    app: JSX.Element;
  
    routes: Route[];
  
    fs: IFileSystemHelper;
  
    pathToPhpStaticDir: string;
    pathToJsStaticDir: string;
  
    pathToJsRenderedPagesDir: string;
    pathToPhpTemplatesDir: string;

    pathToWebpackStatsFile: string;

    pathToHtmlPageTemplate: string;
  
    constructor(
      app: JSX.Element,
      routes: Route[],
      fs: IFileSystemHelper,
      extractor: any,
      pathToPhpStaticDir: string,
      pathToJsStaticDir: string,
      pathToJsRenderedPagesDir: string,
      pathToPhpTemplatesDir: string,
      pathToWebpackStatsFile: string,
      pathToHtmlPageTemplate: string
    ) {
      this.app = app;
      this.routes = routes;
      this.fs = fs;
      this.pathToPhpStaticDir = pathToPhpStaticDir;
      this.pathToJsStaticDir = pathToJsStaticDir;
      this.pathToJsRenderedPagesDir = pathToJsRenderedPagesDir;
      this.pathToPhpTemplatesDir = pathToPhpTemplatesDir;

      this.pathToWebpackStatsFile = pathToWebpackStatsFile;

      this.pathToHtmlPageTemplate = pathToHtmlPageTemplate;
  
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
    
            this.makeAndSavePageTemplate(html, route);
          }
        } catch (err) {
          console.error("ERROR", err.message);
        }
    
    };

    makeAndSavePageTemplate = async (
        html: string, 
        route: Route,
        metaContentMark: string = "!!!meta-description-content!!!",
        titleMark: string = "!!!title!!!",
        cssMark: string = "!!!css!!!",
        jsMark: string = "!!!js!!!",
        contentMark: string = "!!!content!!!"
        ) => {

        //get js without main js
        const pageJsTags = this.extractor.getScriptTags();
        
        //get css without main css
        const pageCssLinkTags = this.extractor.getStyleTags();
    
        let finalTemplate = "";

        const baseTemplate: string = await this.fs.readFile(this.pathToHtmlPageTemplate);

        //console.log("TITLE", route.metaDescriptionContent);
        //console.log(route.title);

        finalTemplate = baseTemplate.replace(metaContentMark, route.metaDescriptionContent);

        finalTemplate = finalTemplate.replace(titleMark, route.title);

        finalTemplate = finalTemplate.replace(jsMark, pageJsTags);

        finalTemplate = finalTemplate.replace(cssMark, pageCssLinkTags);

        finalTemplate = finalTemplate.replace(contentMark, html);

        this.fs.writeFile(
            `${this.pathToPhpTemplatesDir}/${route.fileName}.html`, 
            finalTemplate, 
            true
        );
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
}

export default DiSsrPurePhpHelper;