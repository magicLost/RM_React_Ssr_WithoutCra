import React from "react";
//import axios from "axios";

import { IHiddenField } from "./../../interfaces";
import { IFeedbackModel } from "./../../interfaces";
import {
  IFormElementDesc,
  TFormElementsDescs
} from "../../../../data/feedback_forms_data";
import { IFormState } from "../../../../hooks/Form/form";
import { IRequestState } from "./../../../../hooks/request";
import FeedbackModel from "./../FeedbackModel/FeedbackModel";
import { FormController } from "../../FormController";
import { sendPostWithJsonResponse } from "../../../../helper/Fetch/fetch";

/* interface InputChangeAction {
    type: FORM_ACTION,
    formElementState: IFormElementState
} */

/* type Result = "SUCCESS" | "ERROR";

interface ResponseData{

    result: Result;
    error?: string;

} */

class FeedbackController extends FormController {
  url = "";
  hiddenFields?: IHiddenField[];
  setRequestState: React.Dispatch<
    ((prevState: IRequestState) => IRequestState) | IRequestState
  > | null = null;

  constructor(
    formElements: TFormElementsDescs,
    model: FeedbackModel,
    url: string
  ) {
    super(formElements, model);
    this.url = url;
  }

  onClear = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("onClear");

    this.onClearHandler();

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setRequestState((prevState: IRequestState) => {
      return {
        isRequestSuccess: false,
        isRequestError: false,
        isRequestLoading: false
      };
    });
  };

  onChange = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("onChange", event.target);

    this.onChangeHandler(event.target);
  };

  onSubmit = (event: any): void | undefined => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("Submit");

    this.onSubmitHandler();
  };

  protected onSubmitHandler(): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.setFormState((prevState: IFormState) => {
      if (
        this.model.hasInputsError(
          prevState.formElementsState,
          prevState.formError
        )
      )
        return prevState;

      const formError = this.model.validateOnSubmit(
        prevState.formElementsState
      );

      if (!formError) {
        const formData = this.model.getFormData(
          prevState.formElementsState,
          this.hiddenFields
        );

        /* const token = (<IFeedbackModel>this.model).createToken(
          prevState.formElementsState
        );

        formData.append("_token", token); */

        const {date, token} = (<IFeedbackModel>this.model).calcDateAndToken();

        formData.append("DATE", date);
        formData.append("_token", token);

        this.postRequest(formData);
      } else {
        return {
          formError: formError,
          formMessage: "",
          formElementsState: prevState.formElementsState
        };
      }

      return prevState;
    });
  }

  protected onSuccess = () => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setFormState(prevState => {
      return {
        ...prevState,
        formError: "",
        formMessage:
          "Мы получили вашу заявку и свяжемся с вами в течение 15 минут."
      };
    });

    this.setRequestState({
      isRequestSuccess: true,
      isRequestError: false,
      isRequestLoading: false
    });
  };

  protected onFail = (data: any) => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setFormState(prevState => {
      return {
        ...prevState,
        formError: data.data.error,
        formMessage: ""
      };
    });

    this.setRequestState({
      isRequestSuccess: false,
      isRequestError: false,
      isRequestLoading: false
    });
  };

  protected onWrongStatus = () => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setFormState(prevState => {
      return {
        ...prevState,
        formError: "Что-то не сработало...",
        formMessage: ""
      };
    });

    this.setRequestState({
      isRequestSuccess: false,
      isRequestError: true,
      isRequestLoading: false
    });
  };

  protected onServerError = () => {
    if (this.setRequestState === null)
          throw new Error("No setRequestState...");
      if (this.setFormState === null) throw new Error("No setFormState...");

      this.setFormState(prevState => {
        return {
          ...prevState,
          formError: "Сервер не хочет отвечать.",
          formMessage: ""
        };
      });

      this.setRequestState({
        isRequestSuccess: false,
        isRequestError: true,
        isRequestLoading: false
      });
  };

  protected beforeRequest = () => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setFormState(prevState => {
      if (prevState.formError !== "") return { ...prevState, formError: "" };

      return prevState;
    });

    this.setRequestState({
      isRequestSuccess: false,
      isRequestError: false,
      isRequestLoading: true
    });
  }

  protected postRequest(formData: FormData): void | undefined {

    this.beforeRequest();

    sendPostWithJsonResponse(this.url, formData).then(data => {

      if (data.status && data.status === "success") {

        console.log(data);

        this.onSuccess();

      } else if (data.status && data.status === "fail") {

        console.log(data);

        this.onFail(data);

      } else {

        this.onWrongStatus();

      }

    }).catch(error => {
      console.log("[SERVER ERROR] ", error);
      this.onServerError();
    })

    /* axios({
      method: "post",
      url: this.url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        if (this.setFormState === null) throw new Error("No setFormState...");

        if (this.setRequestState === null)
          throw new Error("No setRequestState...");

        if (response.data.result && response.data.result === "SUCCESS") {
          //if(this.setRequestState === null) throw new Error("No setRequestState...");
          this.setFormState(prevState => {
            return {
              ...prevState,
              formError: "",
              formMessage:
                "Мы получили вашу заявку и свяжемся с вами в течение 15 минут."
            };
          });

          this.setRequestState({
            isRequestSuccess: true,
            isRequestError: false,
            isRequestLoading: false
          });
        } else if (response.data.result && response.data.result === "ERROR") {
          this.setFormState(prevState => {
            return {
              ...prevState,
              formError: response.data.error,
              formMessage: ""
            };
          });

          this.setRequestState({
            isRequestSuccess: false,
            isRequestError: false,
            isRequestLoading: false
          });
        } else {
          throw new Error("Bad result data result? - " + response.data.result);
        }
      })
      .catch(error => {
        if (this.setRequestState === null)
          throw new Error("No setRequestState...");
        if (this.setFormState === null) throw new Error("No setFormState...");

        this.setFormState(prevState => {
          return {
            ...prevState,
            formError: "Сервер не хочет отвечать.",
            formMessage: ""
          };
        });

        this.setRequestState({
          isRequestSuccess: false,
          isRequestError: true,
          isRequestLoading: false
        });
      }); */
  }

  /* protected postRequest(formData: FormData): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    //formDispatch({type: formActions.SET_FORM_ERROR, formError: ''});
    this.setFormState(prevState => {
      if (prevState.formError !== "") return { ...prevState, formError: "" };

      return prevState;
    });

    this.setRequestState({
      isRequestSuccess: false,
      isRequestError: false,
      isRequestLoading: true
    });
    //requestDispatch({type: requestActions.REQUEST_START});

    axios({
      method: "post",
      url: this.url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        if (this.setFormState === null) throw new Error("No setFormState...");

        if (this.setRequestState === null)
          throw new Error("No setRequestState...");

        if (response.data.result && response.data.result === "SUCCESS") {
          //if(this.setRequestState === null) throw new Error("No setRequestState...");
          this.setFormState(prevState => {
            return {
              ...prevState,
              formError: "",
              formMessage:
                "Мы получили вашу заявку и свяжемся с вами в течение 15 минут."
            };
          });

          this.setRequestState({
            isRequestSuccess: true,
            isRequestError: false,
            isRequestLoading: false
          });
        } else if (response.data.result && response.data.result === "ERROR") {
          this.setFormState(prevState => {
            return {
              ...prevState,
              formError: response.data.error,
              formMessage: ""
            };
          });

          this.setRequestState({
            isRequestSuccess: false,
            isRequestError: false,
            isRequestLoading: false
          });
        } else {
          throw new Error("Bad result data result? - " + response.data.result);
        }
      })
      .catch(error => {
        if (this.setRequestState === null)
          throw new Error("No setRequestState...");
        if (this.setFormState === null) throw new Error("No setFormState...");

        this.setFormState(prevState => {
          return {
            ...prevState,
            formError: "Сервер не хочет отвечать.",
            formMessage: ""
          };
        });

        this.setRequestState({
          isRequestSuccess: false,
          isRequestError: true,
          isRequestLoading: false
        });
      });
  } */
}

export default FeedbackController;
