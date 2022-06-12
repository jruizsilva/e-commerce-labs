import React from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./Logo.module.css";

export default function Logo() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/`);
  };

  return (
    <div className={style.container}>
      <Link to="/">
        <img
          src="https://i.ibb.co/RPVvPKV/logo.png"
          alt="logo"
          className={style.logo}
          onClick={handleRedirect}
        />
      </Link>
    </div>
  );
}
