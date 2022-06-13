import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/index.js";

import style from "./FilterCategories.module.css";

export default function FilterCategories() {
  const [params, setParams] = useSearchParams();
  const { categories } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const updateCategory = (e) => {
    params.set("categoryId", e.target.value);
    setParams(params);
  };

  return (
    <div className={style.container}>
      <h4 className={style.title}>Categories</h4>
      <select
        onChange={(e) => {
          updateCategory(e);
        }}
        id="selFilterType"
      >
        <option value="">Select a category</option>
        {categories[0] &&
          categories.map((categori) => {
            return (
              <option key={categori.id} value={categori.id}>
                {categori.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
