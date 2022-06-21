import React from "react";
import Select from "react-select";

const customSelectStyles = {
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "10px 0",
    paddingLeft: "24px",
    color: "#828282",
    fontSize: "16px",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "16px",
    color: "#bdbdbd",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
};

export default ({
  onChange,
  options,
  value,
  placeholder,
  isSearchable = false,
  isMulti = false,
  isClearable = false,
}) => {
  return (
    <>
      <div>
        <Select
          value={value}
          onChange={onChange}
          options={options}
          styles={customSelectStyles}
          placeholder={placeholder}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
          theme={(theme) => ({
            ...theme,
            borderRadius: "8px",
            colors: {
              ...theme.colors,
              primary25: "#e6e6e6",
              primary: "#828282",
            },
          })}
        />
      </div>
    </>
  );
};
