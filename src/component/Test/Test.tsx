import React, { useEffect } from "react";
import classes from "./Test.module.scss";
import {getBodyClientHeight} from './Helper/Helper';


const Test = () => {

  useEffect(() => {
    console.log("useEffect");
    console.log(getBodyClientHeight());
  });

  console.log("Test render");

  return (
    <div className={classes.Test}> 
      
    </div>
  );
};

export default Test;
