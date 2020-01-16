import React, { useState, useEffect, useMemo } from "react";
import classes from "./Header.module.scss";
import Logo from "../../component/UI/Logo/Logo";
import MenuButton from "../../component/UI/MenuButton/MenuButton";
import CallMeButton from "../../component/CallMeButton/CallMeButton";

interface HeaderProps {
  onShowMainMenu: (event: any) => void | undefined;
  callMeButtonClickHandler: (event: any) => void | undefined;
}

const Header = ({ onShowMainMenu, callMeButtonClickHandler }: HeaderProps) => {
  const [isShow, setIsShow] = useState(true);
  const [previousY, setPreviousY] = useState(0);

  useEffect(() => {
    //console.log("add scroll event");
    window.addEventListener("scroll", onWindowScroll, false);

    return () => {
      window.removeEventListener("scroll", onWindowScroll, false);
    };
  });

  const onWindowScroll = (event: any) => {
    //const y = (document.body.getBoundingClientRect() as DOMRect).y;
    const y = document.body.getBoundingClientRect().top;

    //console.log("onWindowScroll - ", isShow, previousY);
    if(y >= -40){
      setIsShow(isShow => {if(isShow === false) return true; else return isShow;});
      setPreviousY(-40);
      return;
    }

    if (previousY > y) {
      //console.log("Hide");
      setIsShow(isShow => {if(isShow === true) return false; else return isShow;});
    } else {
      //console.log("Show");
      setIsShow(isShow => {if(isShow === false) return true; else return isShow;});
    }

    setPreviousY(y);
  };

  const wrapperClasses = isShow
    ? [classes.Wrapper, classes.ShowHeader].join(" ")
    : [classes.Wrapper, classes.HideHeader].join(" ");

  const toolButtonsClass = isShow
    ? [classes.ToolButtons, classes.ShowToolButtons].join(" ")
    : [classes.ToolButtons, classes.HideToolButtons].join(" ");

  //console.log("RENDER Header");

  return (
    <header className={classes.Header}>
      {useMemo(() => (
        <>
          <div className={wrapperClasses}>
            <div className={classes.Logo}>
              <Logo isHomepage={false} />
            </div>

            <div className={classes.MainMenuButton}>
              <MenuButton onClick={onShowMainMenu} />
            </div>
          </div>

          <div className={toolButtonsClass}>
            <CallMeButton clickHandler={callMeButtonClickHandler} />
          </div>
        </>
      ), [isShow])}
    </header>
  );
};

export default Header;
