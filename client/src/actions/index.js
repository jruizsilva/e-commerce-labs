import {
  GET_ALL_PRODUCTS,
  GET_NAME_PRODUCT,
  SORT_BY_VALUE,
  GET_USER,
  LOADING_PRODUCTS,
} from "./types";

import axios from "axios";

export const getAllProducts = (search) => {
  return function (dispatch) {
    dispatch(loadingProducts(true));
    return axios
      .get(`http://localhost:3001/api/products${search}`)
      .then((resp) => {
        dispatch({ type: GET_ALL_PRODUCTS, payload: resp.data });
        dispatch(loadingProducts(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loadingProducts(false));
      });
  };
};
export function getNameProduct(name) {
  return async function (dispatch) {
    dispatch(loadingProducts(true));
    try {
      const json = await axios.get(
        "http://localhost:3001/api/products/search?name=" + name
      );
      dispatch(loadingProducts(false));
      return dispatch({
        type: GET_NAME_PRODUCT,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      dispatch(loadingProducts(false));
    }
  };
}

export const googleAuth = (googleData) => {
  return function (dispatch) {
    return axios
      .post(`http://localhost:3001/api/users/googleAuth`, {
        token: googleData.tokenId,
      })
      .then((resp) => {
        if (!resp.data.err) {
          localStorage.setItem("token_id", resp.data.token);
          dispatch({ type: GET_USER, payload: resp.data.user });
        } else {
          alert(resp.data.err);
        }
      })
      .catch(() => {
        alert("Error en la autenticación");
      });
  };
};

export const loginAuth = (form) => {
  return function (dispatch) {
    return axios
      .post(`http://localhost:3001/api/users/loginAuth`, form)
      .then((resp) => {
        if (!resp.data.err) {
          localStorage.setItem("token_id", resp.data.token);
          dispatch({ type: GET_USER, payload: resp.data.user });
        } else {
          alert(resp.data.err);
        }
      })
      .catch(() => {
        alert("Error en la autenticación");
      });
  };
};

export const getUser = (token) => {
  return function (dispatch) {
    return axios
      .post(`http://localhost:3001/api/users/user`, token && { token })
      .then((resp) => {
        dispatch({ type: GET_USER, payload: resp.data });
      })
      .catch(() => {
        alert("Error en la autenticación");
        localStorage.removeItem("token_id");
      });
  };
};
export const sortByValue = (payload) => {
  return {
    type: SORT_BY_VALUE,
    payload,
  };
};

export const loadingProducts = (payload) => {
  return {
    type: LOADING_PRODUCTS,
    payload,
  };
};
