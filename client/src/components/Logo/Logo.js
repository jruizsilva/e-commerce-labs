import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import style from "./Logo.module.css";

export default function Logo() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/home") {
      setParams({ reset: true });
    } else {
      navigate("/home");
    }
  };
  return (
    <div className={style.container}>
      <button className={style.button} onClick={handleClick}>
        <img
          src="https://i.ibb.co/8dGTfyy/logoapp.png"
          alt="logo"
          className={style.logo}
        />
      </button>
    </div>
  );
}
