import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import 'promise-polyfill/src/polyfill';
//import "intersection-observer";
//import 'core-js/stable';

import Test from "./component/Test/Test";



if(window.Promise){
  window.addEventListener('load', async () => {
  
    //render | hydrate
    ReactDOM.hydrate(
      <BrowserRouter>
        <Test />
      </BrowserRouter> ,
      document.getElementById("root")
    );
  }, false);
}
