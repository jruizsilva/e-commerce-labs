import React from "react";
import { Link } from "react-router-dom";

import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div>
          <h2 className={style.title}>
            Our app connects buyers and sellers in one place.
          </h2>
          <h3 className={style.description}>
            You will be able to find products at the best price, sell all your
            products, see, ask, answer questions and much more.
          </h3>
        </div>

        <div className={style.buttons_container}>
          <button className={style.shop_now_button}>
            <Link to="/" className={style.link_shopnow}>
              Shop now
            </Link>
          </button>
          <button className={style.sell_now_button}>
            <Link to="/" className={style.link_sellnow}>
              Sell now
            </Link>
          </button>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.image_container}>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="photo"
            className={style.image}
          />
        </div>
      </div>
    </div>
  );
}
