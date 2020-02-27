import React from "react";
//import classes from "./Checkbox.module.scss";
import inputClasses from "./../Input/Input.module.scss";
import classes from "./Checkbox.module.scss";
import { FormElementProps } from "../FormElementPropsInterface";

interface CheckboxProps extends FormElementProps {
  checked: boolean;
}

const Checkbox = ({
  elementAttrs,
  labelValue,
  name,
  value,
  onChange,
  checked,
  disabled = false
}: CheckboxProps) => {
  console.log("Checkbox render ");

  const checkboxWrapperClasses = `${inputClasses.BaseInputWrapper} ${classes.Wrapper}`;
  const checkboxClasses = `${inputClasses.BaseInput} ${classes.Checkbox}`;

  return (
    <div className={checkboxWrapperClasses}>
      <label htmlFor={elementAttrs.id} className={classes.Label}>
        {labelValue}
      </label>
      <input
        type="checkbox"
        className={checkboxClasses}
        {...elementAttrs}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Checkbox;
