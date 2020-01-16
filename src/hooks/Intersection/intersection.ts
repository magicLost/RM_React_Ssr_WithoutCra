import {useState, useRef, useEffect} from 'react';
import { isInViewport } from '../../helper/isInViewport';

export const useIntersect = (
    {root = undefined, rootMargin, threshold = 0}: 
    {root?: HTMLElement, rootMargin?: string, threshold: number}
    ): [React.Dispatch<React.SetStateAction<HTMLElement | null>>, boolean ]=> {
    
    //const isInit: React.MutableRefObject<boolean> = useRef(false);

    const observer: React.MutableRefObject<IntersectionObserver | null> = useRef(null);

    const [isIntersect, setIsIntersect] = useState(false);

    /* const [node, setNode] = useState<HTMLElement | null>(() => {
        observer.current = new window.IntersectionObserver(([entry], self) => {
            //console.log("Is Intersect", entry);
            //console.log(self);
            if (entry.isIntersecting) {
                //console.log("isIntersecting - true");
                setIsIntersect(true);
                self.unobserve(entry.target);
                self.disconnect();
            }   
          }, {
            root,
            rootMargin,
            threshold
          }) : null;

        return null;
    }); */

    const [node, setNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
      console.log("INIT useEffect");
      observer.current = new window.IntersectionObserver(([entry], self) => {
        //console.log("Is Intersect", entry);
        //console.log(self);
        if (entry.isIntersecting) {
            //console.log("isIntersecting - true");
            setIsIntersect(true);
            self.unobserve(entry.target);
            self.disconnect();
        }   
      }, {
        root,
        rootMargin,
        threshold
      });
    }, []);
    
    useEffect(
      () => {

        //console.log("useEffect", isIntersect);
        if(!isIntersect){
            if(observer.current === null) throw new Error("No observer");

            //console.log("useEffect if ne intersect", isIntersect);
            const { current: currentObserver } = observer;
            currentObserver.disconnect();
    
            if(node) currentObserver.observe(node);

            return () => currentObserver.disconnect();
        }
      },
      [node, isIntersect]
    );
  
    return [setNode, isIntersect];
  } 

export const useIntersectOrigin = (
    {root = undefined, rootMargin, threshold = 0}: 
    {root?: HTMLElement, rootMargin?: string, threshold: number}
    ): [React.Dispatch<React.SetStateAction<HTMLElement | null>>, (IntersectionObserverEntry | null) ]=> {
    const [entry, updateEntry] = useState<IntersectionObserverEntry | null>(null);
    const [node, setNode] = useState<HTMLElement | null>(null);
  
    const observer = useRef(
      new window.IntersectionObserver(([entry]) => updateEntry(entry), {
        root,
        rootMargin,
        threshold
      })
    );
  
    useEffect(
      () => {
        const { current: currentObserver } = observer;
        currentObserver.disconnect();
  
        if(node) currentObserver.observe(node);
  
        return () => currentObserver.disconnect();
      },
      [node]
    );
  
    return [setNode, entry];
  } 
  
export const useIntersectManual = () : [React.RefObject<HTMLElement>, boolean] => {
    const nodeRef: React.RefObject<HTMLElement> = useRef(null);
    const [isIntersect, setIsIntersect] = useState(false);
  
    const onWindowScroll = (event: any) => {
      if(isInViewport(nodeRef.current)){
        setIsIntersect(true);
        window.removeEventListener('scroll', onWindowScroll);
        window.removeEventListener('resize', onWindowResize);
      }
    };
  
    const onWindowResize = (event: any) => {
      if(isInViewport(nodeRef.current)){
        setIsIntersect(true);
        window.removeEventListener('scroll', onWindowScroll);
        window.removeEventListener('resize', onWindowResize);
      }
    };
  
    useEffect(
      () => {
        if(isInViewport(nodeRef.current)){
          setIsIntersect(true);
        }else{
          window.addEventListener('scroll', onWindowScroll);
          window.addEventListener('resize', onWindowResize);
        }
  
        return () => {
          window.removeEventListener('scroll', onWindowScroll);
          window.removeEventListener('resize', onWindowResize);
        }
      },
      []
    );
  
    return [nodeRef, isIntersect];
  }
  