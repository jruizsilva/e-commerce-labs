import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getNameProduct } from "../../actions/index";
import s from "../SearchBar/SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [input, setInput] = useState({
    name: "",
  });
  const handleChange = (e) => {
    e.preventDefault(e);
    setInput({
      name: e.target.value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault(e);
    if (input.name.trim() === "") return;
    dispatch(getNameProduct(input.name));

    params.set("name", input.name);
    setParams(params);

    setInput({
      name: "",
    });
    navigate(`/${window.location.search}`);
  };
  return (
    <div className={s.container}>
      <input
        className={s.inputContainer}
        type="text"
        placeholder="Search products..."
        value={input.name}
        onChange={(e) => handleChange(e)}
      />
      <button className={s.btn} onClick={(e) => handleClick(e)}>
        <span
          className="material-symbols-rounded"
          style={{ fontSize: "16px", marginRight: "6px" }}
        >
          search
        </span>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
