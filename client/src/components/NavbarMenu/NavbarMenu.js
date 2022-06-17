import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserSelect from "../UserSelect/UserSelect";

import style from "./NavbarMenu.module.css";

export default function NavbarMenu() {
  const { user } = useSelector((state) => state);

  return (
    <ul className={style.container}>
      {!user && (
        <>
          <li className={style.item}>
            <Link to="signin" className={style.link}>
              Sign in
            </Link>
          </li>
          <li className={style.item}>
            <Link to="signup" className={style.link}>
              Sign up
            </Link>
          </li>
        </>
      )}

      {user && (
        <>
          <li className={style.item}>
            <UserSelect user={user} />
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}>
              <span
                className="material-symbols-rounded"
                style={{ fontSize: "16px", color: "#000" }}
              >
                notifications
              </span>
            </Link>
          </li>
        </>
      )}
      <li className={style.item}>
        <Link to="/cart" className={style.link}>
          <span
            className="material-symbols-rounded"
            style={{ fontSize: "16px", color: "#000" }}
          >
            shopping_cart
          </span>
        </Link>
      </li>
    </ul>
  );
}
