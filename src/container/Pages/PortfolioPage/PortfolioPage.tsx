import React from 'react';
//import classes from './PortfolioPage.module.scss';
import PortfolioSlider from '../../Slider/PortfolioSlider/PortfolioSlider';
import { useTitle } from '../../../hooks/Page/page';
import { portfolioTitle } from '../../../data/routes_data';

        
export interface IPortfolioPageProps  {
    showFeedBackFormHandler: (id: string) => void | undefined
}

const PortfolioPage = ({showFeedBackFormHandler}: IPortfolioPageProps) => {

    useTitle(portfolioTitle);

    console.log("RENDER PortfolioPage");

    return (
        
        <PortfolioSlider showFeedBackFormHandler={showFeedBackFormHandler} />
            
    );
};

export default React.memo(PortfolioPage);
        