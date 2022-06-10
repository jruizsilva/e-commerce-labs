import React from "react";

import style from "./NavbarMenu.module.css";

export default function NavbarMenu() {
  return (
    <ul className={style.container}>
      <li className={style.li}>
        <a href="#" className={style.link}>
          Inicia sesión
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.link}>
          Registrate
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.link}>
          <span
            className="material-symbols-rounded"
            style={{ fontSize: "16px", color: "#000" }}
          >
            shopping_cart
          </span>
        </a>
      </li>
    </ul>
  );
}
