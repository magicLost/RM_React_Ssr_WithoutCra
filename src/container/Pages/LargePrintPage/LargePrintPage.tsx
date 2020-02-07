import React from "react";
import classes from "./LargePrintPage.module.scss";
import Table from "../../../component/Table/Table";
import {
  tableMain,
  tableSecond,
  showcaseConditions
} from "./../../../data/large_print_data";
import CategoryShowcase from "../../../component/CategoryShowcase/CategoryShowcase";
import { useTitle } from "../../../hooks/Page/page";
import { largePrintTitle } from "../../../data/routes_data";
//import CalcPrice from "../../Forms/CalcPrice/CalcPrice";
//import Test from "../../../component/Test/Test";


export interface ILargePrintPageProps {
  onFeedback: (event: any) => void | undefined;
  onCalcPrice: (event: any) => void | undefined;
}

const LargePrintPage = ({ onFeedback, onCalcPrice }: ILargePrintPageProps) => {

  useTitle(largePrintTitle);

  return (
    <div className={classes.LargePrintPage}>
      <CategoryShowcase
        conditions={showcaseConditions}
        title={"Широкоформатная печать."}
        orderButtonClick={onFeedback}
        isCalcButton={true}
        calcButtonClick={onCalcPrice}
      />

      {/* <Test /> */}

      {/* <CalcPrice /> */}

      <Table table={tableMain} />
      <Table table={tableSecond} />
    </div>
  );
};

export default LargePrintPage;
