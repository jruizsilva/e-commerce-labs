import React from "react";
import { useSearchParams } from "react-router-dom";
import style from "./FilterReset.module.css";

export default function FilterReset() {
  const [params, setParams] = useSearchParams();

  const handleClick = (e) => {
    e.preventDefault();
    setParams({ reset: true });
  };
  return (
    <div className={style.container}>
      <h4 className={style.title}>Reset</h4>
      <button type="reset" className={style.button} onClick={handleClick}>
        <span
          className="material-symbols-rounded"
          style={{ fontSize: "18px", marginRight: "6px" }}
        >
          restart_alt
        </span>
        Reset
      </button>
    </div>
  );
}
