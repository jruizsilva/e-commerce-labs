import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSelect from "../UserSelect/UserSelect";

import style from "./NavbarMenu.module.css";

const user = {};

export default function NavbarMenu() {
  const navigate = useNavigate();

  return (
    <ul className={style.container}>
      {!user && (
        <>
          <li className={style.item}>
            <a href="" className={style.link} onClick={() => navigate("login")}>
              Inicia sesión
            </a>
          </li>
          <li className={style.item}>
            <a
              href=""
              className={style.link}
              onClick={() => navigate("register")}
            >
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

      {!user && (
        <li className={style.item}>
          <a href="" className={style.link} onClick={() => navigate("login")}>
            <span
              className="material-symbols-rounded"
              style={{ fontSize: "16px", color: "#000" }}
            >
              shopping_cart
            </span>
          </a>
        </li>
      )}

      {user && (
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
      )}
    </ul>
  );
}
