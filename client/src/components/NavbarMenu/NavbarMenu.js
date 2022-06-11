import React from "react";
import { useNavigate } from "react-router-dom";
import UserSelect from "../UserSelect/UserSelect";

import style from "./NavbarMenu.module.css";

const user = null;

export default function NavbarMenu() {
  const navigate = useNavigate();

  const handleRedirect = (e) => {
    navigate(e.target.id);
  };

  return (
    <ul className={style.container}>
      {!user && (
        <>
          <li className={style.item}>
            <a
              href=""
              className={style.link}
              id="login"
              onClick={handleRedirect}
            >
              Inicia sesión
            </a>
          </li>
          <li className={style.item}>
            <a
              href=""
              className={style.link}
              id="register"
              onClick={handleRedirect}
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
