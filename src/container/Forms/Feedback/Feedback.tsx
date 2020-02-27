import React from "react";
//import classes from "./Feedback.module.scss";

import { IHiddenField } from "./../interfaces";
import { useForm, useFormRequest } from "../../../hooks/Form/form";
import FeedbackController from "./FeedbackController/FeedbackController";
import {
  feedbackElementsMap,
  callMeElementsMap
} from "../../../data/feedback_forms_data";
import Form from "../../../component/Form/Form";

interface FeedbackProps {
  url: string;
  //successOkButtonClickHandler: (event: any) => void;
  isCallMe: boolean;
  hiddenFields?: IHiddenField[];
}

const Feedback = ({
  url,
  //successOkButtonClickHandler,
  isCallMe,
  hiddenFields
}: FeedbackProps) => {
  const formElementsMap = isCallMe ? callMeElementsMap : feedbackElementsMap;

  const { controller, formError, formMessage, formElementsState } = useForm(
    url,
    formElementsMap,
    isCallMe ? "CALL_ME" : "FEEDBACK"
  );

  const {
    isRequestLoading,
    isRequestSuccess,
    setRequestState
  } = useFormRequest();

  (controller as FeedbackController).hiddenFields = hiddenFields;
  (controller as FeedbackController).setRequestState = setRequestState;

  console.log("[Render] feedback form");

  return (
    <>
      <Form
        formError={formError}
        formMessage={formMessage}
        formElementsState={formElementsState}
        elementsDescs={formElementsMap}
        submitButtonLabel={"Отправить"}
        onChange={controller.onChange}
        onClear={controller.onClear}
        onSubmit={controller.onSubmit}
        isLoading={isRequestLoading}
      />
    </>
  );
};

export default Feedback;