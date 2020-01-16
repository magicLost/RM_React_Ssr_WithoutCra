import React from 'react';
import classes from './SHomepage.module.scss';
import MainPresentation from "../../MainPresentation/MainPresentation";
import { clients, mainText, photos } from "../../../data/homepage_data";
import ListSvg from "../../../component/UI/ListSvg/ListSvg";
import TextRender from "../../../component/TextRender/TextRender";
import SimpleImageSlider from "../../Slider/SimpleImageSlider/SimpleImageSlider";
import Anchor from '../../../component/UI/Anchor/Anchor';
import Scroller, { GetScrollerItems } from '../../Scroller/Scroller';

        
interface SHomepageProps  {
    
}

const SHomepage = ({}: SHomepageProps) => {

    /* const getScrollerItems: GetScrollerItems = (
        itemClass,
        onItemClick,
        numberOfActiveItems,
        itemRef
      ) => {
        console.log("GET scroller items");
        return [1,2,3,4,5,6].map((value, index: number) => {
    
          return (
            <li
              key={itemClass + index}
              className={itemClass}
              ref={index === 0 ? itemRef : undefined}
              data-index={index}
              style={{ width: "300px", height: "300px", border: "1px solid black" }}
            >
              {index}
            </li>
          );
        });
      }; */

      /* <section className={classes.Section}>
                <div className={classes.Container}>
                    <Scroller 
                        items={[1,2,3,4,5,6]} 
                        getItems={getScrollerItems}
                        isIntersect={true}
                    />
                </div>
            </section> */

    console.log("RENDER SHomepage");

    return (
        
        <>
            <section className={classes.Section}>
                <MainPresentation />
            </section>
            <section className={classes.Section}>
                <TextRender textToParse={mainText} />
            </section>

            <section className={classes.Section}>
                <div className={classes.Container}>
                    <div className={classes.WorksSample}>
                        <h3>Наши работы</h3>
                        <SimpleImageSlider photos={photos} />
                        <Anchor ariaLabel={"Посмотреть портфолио."} label={"Посмотреть портфолио."} href={"/portfolio"} type={"OUTLINED"}/>
                    </div>
                </div>
            </section>

            <section className={classes.Section}>
                <div className={classes.Container}>
                    <div className={classes.Clients}>
                        <ListSvg
                        title={"Наши клиенты"}
                        items={clients}
                        typeSvg={"CLIENTS"}
                        />
                    </div>
                </div>
            </section>
        </>
            
    );
};

export default React.memo(SHomepage);
        