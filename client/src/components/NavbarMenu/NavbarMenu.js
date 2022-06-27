import React, { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserSelect from "../UserSelect/UserSelect";
import { getNotificationsByUserId } from "../../actions";
import Notification from "../Notification/Notification";

import style from "./NavbarMenu.module.css";

export default function NavbarMenu() {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);   

   useEffect(() => {
    if(user){
        dispatch(getNotificationsByUserId(user.id));
    }
  }, [dispatch,]);

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
            <Notification/>
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
          <span style={{ color: "red"}}>
            {cart?.productcarts ? cart.productcarts.length : 0}
          </span>
        </Link>
      </li>
    </ul>
  );
}
