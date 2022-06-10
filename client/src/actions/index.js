import { GET_ALL_PRODUCTS, GET_USER } from "./types";
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

export const googleAuth = (googleData) => {
  return function(dispatch){
    return(
      axios.post(`http://localhost:3001/api/users/googleAuth`, {token: googleData.tokenId})
        .then((resp)=>{
          if (!resp.data.err) {
            localStorage.setItem("token_id", resp.data.token);
            dispatch({type: GET_USER, payload: resp.data.user})
          }else{
            alert(resp.data.err);
          }
        }).catch(()=>{
          alert('Error en la autenticación');
        })
    )
  }
}

export const loginAuth = (form) => {
  return function(dispatch){
    return(
      axios.post(`http://localhost:3001/api/users/loginAuth`, form)
        .then((resp)=>{
          if (!resp.data.err) {
            localStorage.setItem("token_id", resp.data.token);
            dispatch({type: GET_USER, payload: resp.data.user})
          }else{
            alert(resp.data.err);
          }
        }).catch(()=>{
          alert('Error en la autenticación');
        })
    )
  }
}

export const getUser = (token) => {
  return function(dispatch){
    return(
      axios.post(`http://localhost:3001/api/users/user`, token && {token})
        .then((resp)=>{
          dispatch({type: GET_USER, payload: resp.data})
        }).catch(()=>{
          alert('Error en la autenticación');
          localStorage.removeItem("token_id");
        })
    )
  }
}