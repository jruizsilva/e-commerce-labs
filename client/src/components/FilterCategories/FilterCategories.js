import React from "react";
import { useSearchParams } from "react-router-dom";

import style from "./FilterCategories.module.css";

export default function FilterCategories() {
  const [params, setParams] = useSearchParams();
  const updateCategory = () => {
    params.set("category", "new");
    setParams(params);
  };

  return (
    <div className={style.container}>
      <h4 className={style.title}>Categorias</h4>
      <button type="button" className={style.link} onClick={updateCategory}>
        Hogar
      </button>
      <br />
      <button type="button" className={style.link} onClick={updateCategory}>
        Celular
      </button>
    </div>
  );
}
