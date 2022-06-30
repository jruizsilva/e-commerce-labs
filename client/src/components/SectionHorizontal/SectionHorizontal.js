import React from "react";
import CategorySelect from "../CategorySelect/CategorySelect";
import Sort from "../SortSelect/SortSelect";

import style from "./SectionHorizontal.module.css";

export default function SectionHorizontal() {
  return (
    <section className={style.container}>
      <CategorySelect />
      <Sort />
    </section>
  );
}
