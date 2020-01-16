import React from "react";
//import classes from "./Select.module.scss";
import classes from "./../Input/Input.module.scss";
import {HundredPersentWidth} from "./../../../CommonClasses.module.scss";
import { FormElementProps } from "../FormElementPropsInterface";

export type Option = { value: string; label: string };

interface SelectProps extends FormElementProps {
  options: Option[];
}

const select = ({
  elementAttrs,
  labelValue,
  options,
  name,
  value,
  onChange,
  disabled = false
}: SelectProps) => {
  const getOptions = (options: Option[]) => {
    return options.map((option, index) => {
      //let selected = (value !== '') ? option.value === value : option.selected;

      return (
        <option value={option.value} key={option.value + index}>
          {option.label}
        </option>
      );
    });
  };

  const optionsElements = getOptions(options);
  const selectClasses = `${classes.BaseInput} ${HundredPersentWidth}`;

  return (
    <div className={classes.BaseInputWrapper}>
      <label htmlFor={elementAttrs.id} className={classes.Label}>
        {labelValue}
      </label>

      <select
        className={selectClasses}
        {...elementAttrs}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {optionsElements}
      </select>
    </div>
  );
};

export default select;
