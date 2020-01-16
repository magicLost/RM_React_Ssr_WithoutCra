import React, { useEffect, useReducer, useRef, useMemo, useState, JSXElementConstructor } from "react";
import classes from "./Test.module.scss";
//import LargePrintPage from "./../../container/Pages/LargePrintPage/LargePrintPage";



//does ref change with rerender

const useRequest = () => {

  const initState = {
    isRequestSuccess: false,
    requestError: "",
    isRequestLoading: true
  };

  const [requestState, setRequestState] = useState(initState);

  return {
    isRequestLoading: requestState.isRequestLoading,
    isRequestSuccess: requestState.isRequestSuccess,
    requestError: requestState.requestError,
    setRequestState: setRequestState
  };

}

//import(/* webpackChunkName: "LargePrintPage" */ "./../../container/Pages/LargePrintPage/LargePrintPage")
const useDynamicImport = (importPromise: Promise<any>) => {

  const {isRequestLoading, isRequestSuccess, requestError, setRequestState} = useRequest();
  const componentRef: React.MutableRefObject<any> = useRef(null);

  useEffect(() => {
    importPromise.then(({default: Component}) => {
      
      componentRef.current = Component;

      setRequestState(state => {
        return {
          isRequestSuccess: true,
          requestError: "",
          isRequestLoading: false
        }
      })
      
    }).catch(error => {
      setRequestState(state => {
        return {
          isRequestSuccess: true,
          requestError: error.message,
          isRequestLoading: false
        }
      })
    });  
  }, []);

  return {
    isRequestLoading: isRequestLoading,
    isRequestSuccess: isRequestSuccess,
    requestError: requestError,

    component: componentRef.current
  }

}

const LargePrintPageDynamic = (props: any) => {

  const {isRequestLoading, isRequestSuccess, requestError, setRequestState} = useRequest();
  const componentRef: React.MutableRefObject<any> = useRef(null);

  useEffect(() => {
    import(/* webpackChunkName: "LargePrintPage" */ "./../../container/Pages/LargePrintPage/LargePrintPage").then(({default: LargePrintPage}) => {
      
      componentRef.current = LargePrintPage;

      setRequestState(state => {
        return {
          isRequestSuccess: true,
          requestError: "",
          isRequestLoading: false
        }
      })
      
    }).catch(error => {
      setRequestState(state => {
        return {
          isRequestSuccess: true,
          requestError: error.message,
          isRequestLoading: false
        }
      })
    });  
  }, []);

  const getElement = (props: any) => {

    //let element = (<p>Loading...</p>>);

    if(requestError){
      return (
        <>
          <p>Opps...Something goes wrong...</p>
          <p>{requestError}</p>
        </>
      );
    }

    if(isRequestSuccess){
      return (
        <componentRef.current {...props} />
      );
    }

    return <p>Loading..</p>;
  }

  const element = getElement(props);

  console.log("Test render", element );

  return (
    <>
      {element}
    </>
  );

  /* const [isLoading, setIsLoading] = useState(true);

  try{
    const LargePrintPage: any = await import(/* webpackChunkName: "LargePrintPage"  "./../../container/Pages/LargePrintPage/LargePrintPage");
  
    return (
      <LargePrintPage
        {...props}
      />
    );
  }catch(error){
    return (
      <>
        <p>Opps...Something goes wrong...</p>
        <p>{error.message}</p>
      </>
    )
  }   */
}

const Test = () => {

  const [isShowLargePrintPage, setIsShowLargePrintPage] = useState(false);

  useEffect(() => {

    console.log("useEffect");

  }, []);


  //console.log(largePrint);
  const largePrintPage = isShowLargePrintPage ? 
    <LargePrintPageDynamic
      onCalcPrice={() => console.log("onCalcPrice")}
      onFeedback={() => console.log("onFeedback")}
    /> : null;

  console.log("Test render", isShowLargePrintPage, largePrintPage);

  return (
    <div className={classes.Test}> 

      <button onClick={() => {setIsShowLargePrintPage(!isShowLargePrintPage)}}>Show</button>

      {largePrintPage}

    </div>
  );
};

export default Test;
