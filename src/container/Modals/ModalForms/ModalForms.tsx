import React from 'react';
//import classes from './ModalForms.module.scss';
import CalcPrice from "./../../Forms/CalcPrice/CalcPrice";
import Feedback from "./../../Forms/Feedback/Feedback";
import { IHiddenField } from "./../../Forms/interfaces";
import { FORM_TYPE } from "./../../../data/feedback_forms_data";
        
export interface IModalFormsProps  {
    modalChildrenType: FORM_TYPE | "MENU",
    hiddenFields: IHiddenField[]
}

const ModalForms = ({modalChildrenType, hiddenFields}: IModalFormsProps) => {
    if (
        modalChildrenType === "FEEDBACK" ||
        modalChildrenType === "WANNA_THE_SAME"
    ) {
        return (
            <Feedback
                url={"http://192.168.1.231/feedback"}
                hiddenFields={hiddenFields}
                isCallMe={false}
            />
        );
    } else if (modalChildrenType === "CALL_ME") {
        return (
            <Feedback
                url={"http://192.168.1.231/feedback"}
                hiddenFields={hiddenFields}
                isCallMe={true}
            />
        );
    } else if (modalChildrenType === "CALC_PRICE") {
        return <CalcPrice />;
    }
};

export default ModalForms;
        