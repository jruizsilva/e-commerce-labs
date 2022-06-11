import React from "react";
import Filter from "../Filter/Filter";

import style from "./Aside.module.css";

export default function Aside() {
  return (
    <div className={style.container}>
      <Filter />
    </div>
  );
}
