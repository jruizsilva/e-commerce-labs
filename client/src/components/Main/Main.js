import React from "react";
import Aside from "../Aside/Aside";
import Products from "../Products/Products";

import style from "./Main.module.css";

export default function Main() {
  return (
    <div className={style.container}>
      <Aside />
      <Products />
    </div>
  );
}
