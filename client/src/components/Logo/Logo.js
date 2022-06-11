import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./Logo.module.css";

export default function Logo() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/`);
  };

  return (
    <div className={style.container}>
      <img
        src="https://i.ibb.co/RPVvPKV/logo.png"
        alt="logo"
        className={style.logo}
        onClick={handleRedirect}
      />
    </div>
  );
}
