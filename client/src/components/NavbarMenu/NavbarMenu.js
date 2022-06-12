import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSelect from "../UserSelect/UserSelect";

import style from "./NavbarMenu.module.css";

export default function NavbarMenu() {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();

  const handleRedirect = (e) => {
    // console.log(e.target.id);
    // e.preventDefault();
    navigate(e.target.id);
  };

  return (
    <ul className={style.container}>
      {!user.id && (
        <>
          <li className={style.item}>
            <a
              href=""
              className={style.link}
              id="signin"
              onClick={handleRedirect}
            >
              Inicia sesión
            </a>
          </li>
          <li className={style.item}>
            <a
              href=""
              className={style.link}
              id="signup"
              onClick={handleRedirect}
            >
              Registrate
            </a>
          </li>
        </>
      )}

      {user.id && (
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

      {!user.id && (
        <li className={style.item}>
          <a href="" className={style.link} onClick={() => navigate("cart")}>
            <span
              className="material-symbols-rounded"
              style={{ fontSize: "16px", color: "#000" }}
            >
              shopping_cart
            </span>
          </a>
        </li>
      )}

      {user.id && (
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
