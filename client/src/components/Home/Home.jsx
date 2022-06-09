import style from './Home.module.css'
import React from 'react'
import Products from '../Products/Products.jsx'
import Header from '../Header/Header.jsx'
import Filter from '../Filter/Filter.jsx'

const Home = () => {
  return (
    <div className={style.homeContainer}>
      <Header />
      <Filter />
      <Products />
    </div>
  )
}

export default Home