import { TFormElementsState } from "../../../../hooks/Form/form";
import { IFeedbackModel } from "./../../interfaces";
import FormModel from "../../FormModel";
import { IFormValidatorChain } from "./../../../../helper/Validation/FormValidatorChain";

class FeedbackModel extends FormModel implements IFeedbackModel {
  isCallMe: boolean;

  constructor(validatorChain: IFormValidatorChain, isCallMe: boolean) {
    super(validatorChain);

    this.isCallMe = isCallMe;
  }

  validateOnSubmit(stateFormElements: TFormElementsState): string {
    let name = "";
    let email = "";
    let phone = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "NAME":
          name = elemDesc.value;
          break;
        case "EMAIL":
          email = elemDesc.value;
          break;
        case "PHONE":
          phone = elemDesc.value;
          break;
      }
    });

    if (name === "") {
      return "Представьтесь, пожалуйста.";
    }

    if (this.isCallMe) {
      if (phone === "") {
        return "Укажите ваш номер телефона иначе мы не сможем с вами связаться.";
      }
    } else {
      if (email === "" && phone === "") {
        return "Укажите ваш телефон или электронный адрес иначе мы не сможем с вами связаться.";
      }
    }

    return "";
  }

  calcDateAndToken = (): {date: string, token: string} => {

    const date: string = Date.now() + "";

    let str: string = date.substring(date.length - 5);

    let token: string = btoa(`${date}.${str}`);

    return {
      date: date,
      token: token
    };
  }

  createToken(stateFormElements: TFormElementsState): string {
    let name = "";
    let email = "";
    let phone = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "NAME":
          name = elemDesc.value;
          break;
        case "EMAIL":
          email = elemDesc.value;
          break;
        case "PHONE":
          phone = elemDesc.value;
          break;
      }
    });

    let stringToHash = name + email + phone;

    stringToHash = encodeURI(stringToHash).substr(0, 64);

    //console.log(`ALL - ${name + email + phone}`);

    //console.log(`ENCODE - ${stringToHash}`);

    let token = btoa(stringToHash);

    //console.log(`TOKEN - ${token}`);

    if (token.length > 64) {
      token = token.substr(0, 64);
    }

    return token;
  }
}

export default FeedbackModel;
