import React from "react";

import style from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={style.container}>
      <img
        src="https://i.ibb.co/RPVvPKV/logo.png"
        alt="logo"
        className={style.logo}
      />
    </div>
  );
}
