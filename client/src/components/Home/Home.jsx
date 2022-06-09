import style from './Home.module.css';
import React from 'react';
import Products from '../Products/Products.jsx';
import Header from '../Header/Header.jsx';
import Filter from '../Filter/Filter.jsx';
import Sort from '../Sort/Sort.jsx';

const Home = () => {
  return (
    <div className={style.homeContainer}>
      <Header />
      <Sort />
      <Filter />
      <Products />
    </div>
  );
};

export default Home;
