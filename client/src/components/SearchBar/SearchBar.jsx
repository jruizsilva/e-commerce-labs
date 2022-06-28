import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllProducts, getNameProduct } from "../../actions/index";
import s from "../SearchBar/SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [input, setInput] = useState({
    name: "",
  });
  const { user } = useSelector((state) => state);
  useEffect(() => {
    if (params.has("name")) {
      dispatch(getAllProducts(window.location.search, user?.id));
    }
  }, [params, user]);

  const handleChange = (e) => {
    e.preventDefault(e);
    setInput({
      name: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (input.name.trim() === "") return;

    params.set("name", input.name);
    setParams(params);
    dispatch(getAllProducts(window.location.search, user?.id));
    navigate(`/home${window.location.search}`);
    setInput({
      name: "",
    });
  };
  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <input
        className={s.inputContainer}
        type="text"
        placeholder="Search products..."
        value={input.name}
        onChange={(e) => handleChange(e)}
      />
      <button className={s.btn} type="submit">
        <span
          className="material-symbols-rounded"
          style={{ fontSize: "16px", marginRight: "6px" }}
        >
          search
        </span>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
