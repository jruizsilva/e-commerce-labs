import React from "react";
import { Link } from "react-router-dom";

import style from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={style.container}>
      <Link to="/home">
        <img
          src="https://i.ibb.co/RPVvPKV/logo.png"
          alt="logo"
          className={style.logo}
        />
      </Link>
    </div>
  );
}
