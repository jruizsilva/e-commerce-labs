import { GET_ALL_PRODUCTS, GET_NAME_PRODUCT } from "./types";
import axios from 'axios';

export const getAllProducts = () => {
  return function(dispatch){
    return(
      axios.get(`http://localhost:3001/api/products`)
        .then((resp)=>{
          dispatch({type: GET_ALL_PRODUCTS, payload: resp.data})
        })
    )
  }
}
export function getNameProduct(name){
  return async function(dispatch){
    try {
      const json = await axios.get('http://localhost:3001/api/products?name=' + name)
      return dispatch({
        type: GET_NAME_PRODUCT,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}