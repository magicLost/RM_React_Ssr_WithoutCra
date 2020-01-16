import React from 'react';
//import classes from './PortfolioPage.module.scss';
import PortfolioSlider from '../../Slider/PortfolioSlider/PortfolioSlider';

        
interface PortfolioPageProps  {
    showFeedBackFormHandler: (id: string) => void | undefined
}

const PortfolioPage = ({showFeedBackFormHandler}: PortfolioPageProps) => {

    console.log("RENDER PortfolioPage");

    return (
        
        <PortfolioSlider showFeedBackFormHandler={showFeedBackFormHandler} />
            
    );
};

export default React.memo(PortfolioPage);
        