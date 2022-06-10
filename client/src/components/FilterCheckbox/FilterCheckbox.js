import React from "react";
import { useSearchParams } from "react-router-dom";

import style from "./FilterCheckbox.module.css";

export default function FilterCheckbox() {
  const [params, setParams] = useSearchParams();

  const handleChange = (e) => {
    params.set("travel_cost", e.target.checked);
    setParams(params);
  };

  return (
    <form className={style.container}>
      <p className={style.p}>Envio gratis</p>
      <label className="switch">
        <input type="checkbox" onChange={handleChange} />
        <span className="slider round"></span>
      </label>
    </form>
  );
}
