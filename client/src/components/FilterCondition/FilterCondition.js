import React from "react";
import { useSearchParams } from "react-router-dom";

import style from "./FilterCondition.module.css";

export default function FilterCondition() {
  const [params, setParams] = useSearchParams();
  const updateNewCondition = () => {
    params.set("condition", "new");
    setParams(params);
  };

  const updateUsedCondition = () => {
    params.set("condition", "used");
    setParams(params);
  };

  return (
    <div className={style.container}>
      <h4 className={style.title}>Condición</h4>
      <button type="button" className={style.link} onClick={updateNewCondition}>
        Nuevo
      </button>
      <br />
      <button
        type="button"
        className={style.link}
        onClick={updateUsedCondition}
      >
        Usado
      </button>
    </div>
  );
}
