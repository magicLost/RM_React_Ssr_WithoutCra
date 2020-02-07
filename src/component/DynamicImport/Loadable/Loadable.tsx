import React, {useEffect, useRef, useState} from 'react';
import classes from './Loadable.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
        
/* const LoadableLargePrintPage =  Loadable({
    loader: () => import(/* webpackChunkName: "LargePrintPage"  "./../../container/Pages/LargePrintPage/LargePrintPage"),
    loading: Loading,
    timeout: 5000, // 10 seconds,
    delay: 300,
    render(loaded, props){
      let Component = loaded.default;
      return <Component {...props} />
    }
 }); */

interface useRequestState {
    isRequestSuccess: boolean,
    requestError: string,
    isRequestLoading: boolean
}

 const useRequest = () => {

    const initState: useRequestState = {
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

/* type UseDynamicImport = <T extends React.FunctionComponent>(importPromise: () => Promise<Module>) => {
    isRequestLoading: boolean,
    isRequestSuccess: boolean,
    requestError: string,

    component: T
}; */

const sendDynamicImport = (
        importPromise: () => Promise<any>,
        setRequestState: React.Dispatch<React.SetStateAction<useRequestState>>,
        componentRef: React.MutableRefObject<React.FunctionComponent<any> | null>
    ): void | undefined => {
    importPromise().then(({default: Component}: {default: React.FunctionComponent<any>}) => {
        
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
};

const useDynamicImport = (importPromise: () => Promise<any>): {
    isRequestLoading: boolean,
    isRequestSuccess: boolean,
    requestError: string,
    //setIsLoading: () => void | undefined,
    retry: () => void | undefined,

    Component: React.FunctionComponent<any>
} => {

    const {isRequestLoading, isRequestSuccess, requestError, setRequestState} = useRequest();
    const componentRef: React.MutableRefObject<React.FunctionComponent<any> | null> = useRef(null);

    useEffect(() => {

        sendDynamicImport(importPromise, setRequestState, componentRef);

        /* importPromise().then(({default: Component}: {default: React.FunctionComponent<any>}) => {
        
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
        });   */
    }, []);

    const retry = () => {

        setRequestState(state => {
            return {
                isRequestSuccess: false,
                requestError: '',
                isRequestLoading: true
            }
        });

        sendDynamicImport(importPromise, setRequestState, componentRef);
    }

    return {
        isRequestLoading: isRequestLoading,
        isRequestSuccess: isRequestSuccess,
        requestError: requestError,
        //setIsLoading: setIsLoading,
        retry: retry,

        Component: componentRef.current as React.FunctionComponent<any>
    }
  
}

interface LoadableProps<T>  {
    importPromise: () => Promise<any>,
    props: T
}

 /* USAGE */
/* <Loadable<LargePrintPageProps>
    importPromise={
    () => {
        return import(/* webpackChunkName: "LargePrintPage" / "./../../container/Pages/LargePrintPage/LargePrintPage")
    }
    }
    props={{
    onCalcPrice: () => console.log("onCalcPrice"),
    onFeedback: () => console.log("onFeedback")
    }}
 
/> */

const Loadable = <T extends object>({importPromise, props}: LoadableProps<T>) => {

    const { isRequestSuccess, requestError, retry, Component } = useDynamicImport(importPromise);

    if(requestError){
      return (
        <div className={classes.Error}>
            <p>Не удалось получить данные...</p>
            {/*<p>{requestError}</p>*/}
            <Button 
                label={"Попробовать снова"} 
                ariaLabel={"Попробовать снова"} 
                type="OUTLINED"
                onClick={retry}
            />
        </div>
      );
    }

    if(isRequestSuccess){
      return (
        <Component {...props} />
      );
    }

    return <Spinner />;
};

export default Loadable;
        