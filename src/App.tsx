import React, { useState, useMemo } from "react";
import classes from "./App.module.scss";
import MenuTab from "./component/MenuTab/MenuTab";
import { mainMenuItems } from "./data/menu_data";
import Modal from "./component/Modal/Modal";
import { useApp } from "./hooks/App/app";
import Header from "./container/Header/Header";
import Feedback from "./container/Forms/Feedback/Feedback";
import { Switch, Route } from "react-router-dom";
import Homepage from "./container/Pages/Homepage/Homepage";
import ContactsPage from "./container/Pages/ContactsPage/ContactsPage";
import LargePrintPage from "./container/Pages/LargePrintPage/LargePrintPage";
import CalcPrice from "./container/Forms/CalcPrice/CalcPrice";

function App() {
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
        <Switch>
          <Route path="/large-print">
            <LargePrintPage
              onCalcPrice={controller.onShowCalcPriceForm}
              onFeedback={controller.onShowFeedbackForm}
            />
          </Route>
          <Route path="/contacts">
            <ContactsPage />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </main>

      <footer className={classes.Footer}>
        <p>
          2019 © Рекламно-производственная компания «Реклама-Маркет» —
          производство наружной рекламы
        </p>
        <p>г. Санкт-Петербург, Сабировская улица, дом 37</p>
        <p>+7 (812) 438-03-78; +7 (921) 414-20-92</p>
      </footer>

      <Modal
        show={state.isShowModalFromTop}
        onClose={controller.onHideModal}
        type={"CENTER"}
      >
        {useMemo(() => {
          if (
            controller.modalChildrenType === "FEEDBACK" ||
            controller.modalChildrenType === "WANNA_THE_SAME"
          ) {
            return (
              <Feedback
                url={"http://public.local/feedback"}
                hiddenFields={controller.hiddenFields}
                isCallMe={false}
              />
            );
          } else if (controller.modalChildrenType === "CALL_ME") {
            return (
              <Feedback
                url={"http://public.local/feedback"}
                hiddenFields={controller.hiddenFields}
                isCallMe={true}
              />
            );
          } else if (controller.modalChildrenType === "CALC_PRICE") {
            return <CalcPrice />;
          }
        }, [state.isShowModalFromTop, controller.modalChildrenType])}
      </Modal>

      <Modal
        show={state.isShowModalFromLeft}
        onClose={controller.onHideModal}
        type={"LEFT_TAB"}
      >
        {useMemo(() => {
          if (controller.modalChildrenType === "MENU") {
            return (
              <MenuTab
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
        }, [state.isShowModalFromLeft, controller.modalChildrenType])}
      </Modal>
    </div>
  );
}

export default App;
