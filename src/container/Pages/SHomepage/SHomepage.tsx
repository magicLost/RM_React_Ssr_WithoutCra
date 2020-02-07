import React from 'react';
import classes from './SHomepage.module.scss';
import MainPresentation from "../../MainPresentation/MainPresentation";
import { clients, mainText, photos } from "../../../data/homepage_data";
import ListSvg from "../../../component/UI/ListSvg/ListSvg";
import TextRender from "../../../component/TextRender/TextRender";
import SimpleImageSlider from "../../Slider/SimpleImageSlider/SimpleImageSlider";
import Anchor from '../../../component/UI/Anchor/Anchor';
import { useTitle } from '../../../hooks/Page/page';
import { homepageTitle } from '../../../data/routes_data';
     
interface SHomepageProps  {
    
}

const SHomepage = ({}: SHomepageProps) => {

    useTitle(homepageTitle);

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
        