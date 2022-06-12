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
      <h4 className={style.title}>Condition</h4>
      <ul>
        <li className={style.item}>
          <span className={style.link} onClick={updateNewCondition}>
            New
          </span>
        </li>
        <li className={style.item}>
          <span className={style.link} onClick={updateUsedCondition}>
            Secondhand
          </span>
        </li>
      </ul>
    </div>
  );
}
