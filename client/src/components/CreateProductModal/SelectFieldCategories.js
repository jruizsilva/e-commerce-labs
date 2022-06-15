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

export const SelectFieldCategories = ({ options, field, form }) =>
  React.createElement(Select, {
    styles: selectCustomStyles,
    options: options,
    name: field.name,
    value: options
      ? options.find((option) => option.value === field.value)
      : "",
    onChange: (options) => {
      const formatData = options.map((option) => {
        return option.value;
      });
      return form.setFieldValue(field.name, formatData);
    },
    onBlur: field.onBlur,
    isMulti: true,
    placeholder: "Categories (*)",
  });
