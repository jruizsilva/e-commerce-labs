import React from "react";
import Select from "react-select";

const selectCustomStyles = {
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "8px 0",
    paddingLeft: "24px",
    color: "#828282",
    fontSize: "16px",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "16px",
    color: "#bdbdbd",
  }),
};

export const SelectFieldState = ({ options, field, form }) =>
  React.createElement(Select, {
    styles: selectCustomStyles,
    options: options,
    name: field.name,
    value: options
      ? options.find((option) => option.value === field.value)
      : "",
    onChange: (option) => {
      return form.setFieldValue(field.name, option.value);
    },
    onBlur: field.onBlur,
    placeholder: "State (*)",
  });
