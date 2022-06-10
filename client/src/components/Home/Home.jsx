import style from "./Home.module.css";
import React from "react";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";
import Sort from "../Sort/Sort";

const Home = () => {
  return (
    <div>
      <Header />
      <Sort />
      <Main />
    </div>
  );
};

export default Home;
