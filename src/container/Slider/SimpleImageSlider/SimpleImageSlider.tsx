import React from "react";
import classes from "./SimpleImageSlider.module.scss";
import Scroller, { GetScrollerItems } from "../../Scroller/Scroller";
//import ImgWithLoading from "../../../component/UI/ImgWithLoading/ImgWithLoading";
import Image from "../../../component/UI/Image/Image";
import {useIntersect} from "../../../hooks/Intersection/intersection";

interface SimpleImageSliderProps {
  photos: string[];
}

const SimpleImageSlider = ({ photos }: SimpleImageSliderProps) => {

  const [setNode, isIntersect] = useIntersect({threshold: 0});

  const getScrollerItems: GetScrollerItems = (
    itemClass,
    onItemClick,
    numberOfActiveItems,
    itemRef
  ) => {
    console.log("GET scroller items");
    return photos.map((value, index: number) => {
      //console.log("get scroller items", itemRef);
      let isActive = isIntersect && (index + 1 <= numberOfActiveItems);
      //console.log("IS INTERSECT", isActive);
      //console.log("numberOfActiveItems", numberOfActiveItems);

      return (
        <li
          key={itemClass + index}
          className={itemClass}
          ref={index === 0 ? itemRef : undefined}
          data-index={index}
        >
          <div className={classes.PhotoWrapper}>
            <Image
              alt={"Пример нашей работы."}
              isActive={isActive}
              src={photos[index]}
            />
          </div>
        </li>
      );
    });
  };

  console.log("RENDER SimpleImageSlider");

  return (
    <div ref={setNode} className={classes.SimpleImageSlider}>
      <Scroller 
        items={photos} 
        getItems={getScrollerItems}
        isIntersect={isIntersect}
      />
    </div>
  );
};

export default SimpleImageSlider;
