import "intersection-observer";
import 'whatwg-fetch'
import 'core-js/stable';

/* WE MUST ADD PROMISE POLYFIL IN THE MAIN INDEX FILE, CASE DYNAMIC IMPORT
        WILL NOT WORK WITHOUT PROMISE
    */
//import 'promise-polyfill/src/polyfill';


/* USE TRY CATCH TO CHECK IF POLYFIL LOADS */
class Polyfil{

    checkAndGetProjectNeeds = async() => {

        if(!this.isIntersectionObserver()){
            await import(/* webpackChunkName: "intersection-observer-polyfill" */ 'intersection-observer');
        }

        if(!this.isFetch()){
            await import(/* webpackChunkName: "fetch-polyfill" */ 'whatwg-fetch');
        }

        if(!this.isMap() || !this.isSet()){
            await import(/* webpackChunkName: "es-polyfill" */ 'core-js/stable');
        }

    }

    checkReactNeeds = async() => {
    }
    
    isFetch = () => {
        return window.fetch !== undefined;
    }

    /* WE MUST ADD PROMISE POLYFIL IN THE MAIN INDEX FILE, CASE DYNAMIC IMPORT
        WILL NOT WORK WITHOUT PROMISE
    */
    isPromise = () => {
        return window.Promise !== undefined;
    }

    isMap = () => {
        return window.Map !== undefined;
    }

    isSet = () => {
        return window.Set !== undefined;
    }

    //IntersectionObserver
    isIntersectionObserver = () => {
        return window.IntersectionObserver !== undefined;
    }

}

export default Polyfil;