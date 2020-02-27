import React, { useState, useMemo, useEffect } from "react";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import pMinDelay from 'p-min-delay';

import classes from "./App.module.scss";

import MenuTab from "./component/MenuTab/MenuTab";
import { mainMenuItems } from "./data/menu_data";
import Modal from "./component/Modal/Modal";
import { useApp } from "./hooks/App/app";
import Header from "./container/Header/Header";
//import Feedback from "./container/Forms/Feedback/Feedback";
//import SHomepage from "./container/Pages/SHomepage/SHomepage";
//import ContactsPage from "./container/Pages/ContactsPage/ContactsPage";
import {ILargePrintPageProps} from "./container/Pages/LargePrintPage/LargePrintPage";
//import CalcPrice from "./container/Forms/CalcPrice/CalcPrice";
import {IPortfolioPageProps} from "./container/Pages/PortfolioPage/PortfolioPage";
import Spinner from "./component/UI/Spinner/Spinner";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";
import {IModalFormsProps} from "./container/Modals/ModalForms/ModalForms";
import NotFoundPage from "./container/Pages/NotFoundPage/NotFoundPage";


const spinner = <Spinner />;

const HomepageLoadable = loadable(
  () => pMinDelay(import("./container/Pages/SHomepage/SHomepage"), 300), 
  { fallback: spinner }
);

const LargePrintPageLoadable = loadable(
  (props: ILargePrintPageProps) => pMinDelay(import("./container/Pages/LargePrintPage/LargePrintPage"), 300),
  { fallback: spinner }
);

const PortfolioPageLoadable = loadable(
  (props: IPortfolioPageProps) => pMinDelay(import("./container/Pages/PortfolioPage/PortfolioPage"), 300),
  { fallback: spinner }
);

const ContactsPageLoadable = loadable(
  () => pMinDelay(import("./container/Pages/ContactsPage/ContactsPage"), 300),
  { fallback: spinner }
);

/* const MenuLoadable: React.FunctionComponent<IMenuTabProps> = loadable(
  (props: IMenuTabProps) => pMinDelay(import("./component/MenuTab/MenuTab"), 300),
  { fallback: spinner }
); */

const ModalFormsLoadable: React.FunctionComponent<IModalFormsProps> = loadable(
  (props: IModalFormsProps) => pMinDelay(import("./container/Modals/ModalForms/ModalForms"), 300),
  { fallback: spinner }
)


const App: React.FunctionComponent = () => {
  const { state, controller } = useApp();

  console.log("render App");

  //hide footer on reload page
  //<Route path="/" onChange={yourHandler} component={AppContainer}>
  //import { browserHistory } from 'react-router';
  /* 
  browserHistory.listen( location =>  {
    //Do your stuff here
  });
  */

  return (
    <div className={classes.App}>
      <Header
        onShowMainMenu={controller.onShowMenu}
        callMeButtonClickHandler={controller.onShowCallMeForm}
      />

      <main>
        <ErrorBoundary>
          <Switch>
            <Route path="/large-print">
              <LargePrintPageLoadable
                onCalcPrice={controller.onShowCalcPriceForm}
                onFeedback={controller.onShowFeedbackForm}
              />
            </Route>
            <Route path="/portfolio">
              <PortfolioPageLoadable showFeedBackFormHandler={controller.onShowWannaTheSameForm} />
            </Route>
            <Route path="/contacts">
              <ContactsPageLoadable />
            </Route>
            <Route path="/">
              <HomepageLoadable />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </ErrorBoundary>
      </main>

      <footer className={classes.Footer}>
        <p>
          2019 © Рекламно-производственная компания «Реклама-Маркет» —
          производство наружной рекламы
        </p>
        <p>г. Санкт-Петербург, Сабировская улица, дом 37</p>
        <p>+7 (812) 438-03-78 | +7 (921) 414-20-92</p>
      </footer>

      <Modal
        show={state.isShowModalFromTop}
        onClose={controller.onHideModal}
        type={"CENTER"}
      >
        <ErrorBoundary>
          <ModalFormsLoadable
            modalChildrenType={controller.modalChildrenType}
            hiddenFields={controller.hiddenFields}
          />
        </ErrorBoundary>
        {/* {useMemo(() => {
          if (
            controller.modalChildrenType === "FEEDBACK" ||
            controller.modalChildrenType === "WANNA_THE_SAME"
          ) {
            return (
              <Feedback
                url={"http://192.168.1.231/feedback"}
                hiddenFields={controller.hiddenFields}
                isCallMe={false}
              />
            );
          } else if (controller.modalChildrenType === "CALL_ME") {
            return (
              <Feedback
                url={"http://192.168.1.231/feedback"}
                hiddenFields={controller.hiddenFields}
                isCallMe={true}
              />
            );
          } else if (controller.modalChildrenType === "CALC_PRICE") {
            return <CalcPrice />;
          }
        }, [state.isShowModalFromTop])} */}
      </Modal>

      <Modal
        show={state.isShowModalFromLeft}
        onClose={controller.onHideModal}
        type={"LEFT_TAB"}
      >
        { controller.modalChildrenType === "MENU" && 
            <MenuTab
              isVisible={true}
              items={mainMenuItems}
              layer={0}
              backgroundColors={["white", "#f7f7f7", "gray"]}
              initHeight={220}
              initTopBottomPadding={20}
              onCloseMenu={controller.onHideModal}
            />
        }

        {/* {useMemo(() => {
          if (controller.modalChildrenType === "MENU") {
            return (
              <MenuLoadable
                isVisible={true}
                items={mainMenuItems}
                layer={0}
                backgroundColors={["white", "#f7f7f7", "gray"]}
                initHeight={220}
                initTopBottomPadding={20}
                onCloseMenu={controller.onHideModal}
              />
            );
          }
        }, [state.isShowModalFromLeft])} */}
      </Modal>
    </div>
  );
}

export default App;
