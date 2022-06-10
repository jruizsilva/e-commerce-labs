import React from "react";
import { useSearchParams } from "react-router-dom";
import style from "./FilterReset.module.css";

export default function FilterReset() {
  const [params, setParams] = useSearchParams();

  const handleClick = () => {
    setParams({ reset: true });
  };
  return (
    <div className={style.container}>
      <h4 className={style.title}>Reset</h4>
      <button type="reset" className={style.link} onClick={handleClick}>
        Reset
      </button>
    </div>
  );
}
