import CalcTranslateX from "./CalcTranslateX";

import { CarouselState } from "../../../hooks/Carousels/Carousel/types";

export interface ICarouselController {
  //setState: React.Dispatch<((prevState: CarouselState) => CarouselState) | CarouselState> | null = null;
  //setState: CarouselState;
  calc: CalcTranslateX;

  decreaseActiveIndex: () => void | undefined;
  increaseActiveIndex: () => void | undefined;

  activeIndex: number;
  itemsLength: number;

  onMouseDown: (event: any) => void | undefined;
  onMouseMove: (event: any) => void | undefined;
  onMouseUp: (event: any) => void | undefined;

  onTouchStart: (event: any) => void | undefined;
  onTouchMove: (event: any) => void | undefined;
  onTouchEnd: (event: any) => void | undefined;
}

export default abstract class CarouselController
  implements ICarouselController {
  //setState: React.Dispatch<((prevState: CarouselState) => CarouselState) | CarouselState> | null = null;
  calc: CalcTranslateX;

  decreaseActiveIndex: () => void | undefined;
  increaseActiveIndex: () => void | undefined;

  activeIndex: number = 0;
  itemsLength: number = 0;

  constructor(
    calc: CalcTranslateX,
    increaseActiveIndex: () => void | undefined,
    decreaseActiveIndex: () => void | undefined
  ) {
    this.calc = calc;
    this.decreaseActiveIndex = decreaseActiveIndex;
    this.increaseActiveIndex = increaseActiveIndex;
  }

  onMouseDown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    window.addEventListener("mousemove", this.onMouseMove, false);
    window.addEventListener("mouseup", this.onMouseUp, false);

    this.onPointerDown(event.pageX, event.pageY);
  };

  onMouseMove = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.onPointerMove(event.pageX, event.pageY);
  };

  onMouseUp = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.onPointerUp();

    window.removeEventListener("mousemove", this.onMouseMove, false);
    window.removeEventListener("mouseup", this.onMouseUp, false);
  };

  onTouchStart = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const touches = event.changedTouches[0];

    this.onPointerDown(touches.pageX, touches.pageY);
  };

  onTouchMove = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const touches = event.changedTouches[0];

    this.onPointerMove(touches.pageX, touches.pageY);
  };

  onTouchEnd = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.onPointerUp();
  };

  protected abstract onPointerDown(
    pageX: number,
    pageY: number
  ): void | undefined;
  protected abstract onPointerMove(
    pageX: number,
    pageY: number
  ): void | undefined;
  protected abstract onPointerUp(): void | undefined;
}
