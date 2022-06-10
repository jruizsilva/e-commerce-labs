import { GET_ALL_PRODUCTS } from "./types";
import axios from 'axios';

export const getAllProducts = () => {
  return function(dispatch){
    return(
      axios.get(`http://localhost:3001/api/products`) // edit Tomas: cambio el port de 3000 a 3001 para que traiga los productos
        .then((resp)=>{
          dispatch({type: GET_ALL_PRODUCTS, payload: resp.data})
        })
    )
  }
}