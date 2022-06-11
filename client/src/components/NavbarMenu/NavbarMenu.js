import React from "react";
import UserSelect from "../UserSelect/UserSelect";

import style from "./NavbarMenu.module.css";

const user = {};

export default function NavbarMenu() {
  return (
    <ul className={style.container}>
      {!user && (
        <>
          <li className={style.item}>
            <a href="#" className={style.link}>
              Inicia sesión
            </a>
          </li>
          <li className={style.item}>
            <a href="#" className={style.link}>
              Registrate
            </a>
          </li>
        </>
      )}

      {user && (
        <>
          <li className={style.item}>
            <UserSelect />
          </li>
          <li className={style.item}>
            <a href="#" className={style.link}>
              <span
                className="material-symbols-rounded"
                style={{ fontSize: "16px", color: "#000" }}
              >
                notifications
              </span>
            </a>
          </li>
        </>
      )}

      <li className={style.item}>
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
