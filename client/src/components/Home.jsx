import React from 'react'
import {useSelector} from 'react-redux'
const Home = () => {
  const contador = useSelector(state => state.contador)
  return (
    <div>
      <h1>{contador}</h1>
      <button>+</button>
    </div>
  )
}

export default Home