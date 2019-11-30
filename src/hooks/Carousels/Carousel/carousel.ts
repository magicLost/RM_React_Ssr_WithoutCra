import { useState, useRef } from "react";
import { ICarouselController } from "./../../../container/Carousels/Carousel/CarouselController";
import CarouselOpacityController from "../../../container/Carousels/Carousel/CarouselOpacity/Controller/CarouselOpacityController";
import CalcTranslateX from "../../../container/Carousels/Carousel/CalcTranslateX";
import CastTranslateXToOpacity from "../../../container/Carousels/Carousel/CarouselOpacity/Model/CastTranslateXToOpacity";
import CarouselTranslateController from "../../../container/Carousels/Carousel/CarouselTranslate/Controller/CarouselTranslateController";

interface CarouselState {
  isTranslated: boolean;
  translateX: number;
}

export interface CarouselOpacityState extends CarouselState {
  opacity: number;
}

export interface CarouselTranslateState extends CarouselState {
  listStyle: any;
}

export const useCarouselOpacity = (
  increaseActiveIndex: () => void | undefined,
  decreaseActiveIndex: () => void | undefined
) => {
  const controllerRef: React.MutableRefObject<ICarouselController> = useRef(
    null
  );

  const [state, setState] = useState(() => {
    controllerRef.current = new CarouselOpacityController(
      new CalcTranslateX(),
      increaseActiveIndex,
      decreaseActiveIndex,
      new CastTranslateXToOpacity()
    );

    const initState: CarouselOpacityState = {
      opacity: 1,
      isTranslated: false,
      translateX: 0
    };

    return initState;
  });

  (controllerRef.current as CarouselOpacityController).setState = setState;

  return {
    controller: controllerRef.current,
    opacity: state.opacity,
    isTranslated: state.isTranslated
  };
};

export const useCarouselTranslate = (
  increaseActiveIndex: () => void | undefined,
  decreaseActiveIndex: () => void | undefined
) => {
  const controllerRef: React.MutableRefObject<ICarouselController> = useRef(
    null
  );

  const [state, setState] = useState(() => {
    controllerRef.current = new CarouselTranslateController(
      new CalcTranslateX(),
      increaseActiveIndex,
      decreaseActiveIndex
    );

    const initState: CarouselTranslateState = {
      listStyle: {
        transitionProperty: "transform",
        transitionDuration: "0.5s"
      },
      isTranslated: false,
      translateX: 0
    };

    return initState;
  });

  (controllerRef.current as CarouselTranslateController).setState = setState;

  return {
    controller: controllerRef.current,
    listStyle: state.listStyle,
    //isTranslated: state.isTranslated,
    translateX: state.translateX
  };
};
