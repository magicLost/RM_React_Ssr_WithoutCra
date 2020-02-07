import React from 'react';
import classes from './Loading.module.scss';
import Spinner from "../../UI/Spinner/Spinner";
        
interface DynamicImportLoadingProps  {
    error?: string,
    pastDelay?: boolean,
    timedOut?: boolean,
    retry?: () => void | undefined
}

const Loading = ({error, pastDelay, timedOut, retry}: DynamicImportLoadingProps) => {

    let result = null

    if (error) {

        result = <div>Error! <button onClick={ retry }>Retry</button></div>;

    } else if (timedOut) {

        result = <div>Taking a long time... <button onClick={ retry }>Retry</button></div>;
    
    } else if (pastDelay) {
        
        result = <Spinner />;

    }

    return (
        
        <div className={classes.DynamicImportLoading}>
            {result}
        </div>
            
    );
};

export default Loading;
        