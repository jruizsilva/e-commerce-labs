import {
  GET_ALL_PRODUCTS,
  GET_NAME_PRODUCT,
  SORT_BY_VALUE,
  GET_USER,
  GET_CATEGORIES,
  LOADING_PRODUCTS,
  LOADING_USER,
  UPDATE_GOOGLE_AUTH_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  GET_QUESTIONS_WITH_ANSWERS,
  ADD_QUESTION,
} from "./types";
import axios from "axios";

export const getAllProducts = (search) => {
  return function (dispatch) {
    dispatch(loadingProducts(true));
    return axios
      .get(`/api/products${search}`)
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
      const json = await axios.get("/api/products/search?name=" + name);
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
      .post(`/api/users/googleAuth`, {
        token: googleData.tokenId,
      })
      .then((resp) => {
        updateGoogleAuthErrorMessage("");
        localStorage.setItem("token_id", resp.data.token);
        dispatch({ type: GET_USER, payload: resp.data.user });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        dispatch(updateGoogleAuthErrorMessage(err.response.data.message));
        // alert(err.response.data.message);
      });
  };
};

export const loginAuth = (form) => {
  return function (dispatch) {
    return axios
      .post(`/api/users/signin`, form)
      .then((resp) => {
        localStorage.setItem("token_id", resp.data.token);
        dispatch({ type: GET_USER, payload: resp.data.user });
      })
      .catch((err) => {
        // console.log(err);
        dispatch(updateLoginErrorMessage(err.response.data.message));
        // alert(err.response.data.message);
      });
  };
};

export const getUser = (token) => {
  return function (dispatch) {
    return axios
      .post(`/api/users/user`, token && { token })
      .then((resp) => {
        dispatch({ type: GET_USER, payload: resp.data });
        dispatch(loadingUser(false));
      })
      .catch(() => {
        alert("Error en la autenticación");
        localStorage.removeItem("token_id");
        dispatch(loadingUser(false));
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
export const loadingUser = (payload) => {
  return {
    type: LOADING_USER,
    payload,
  };
};

export const getCategories = () => {
  return function (dispatch) {
    return axios.get(`/api/categories`).then((resp) => {
      dispatch({ type: GET_CATEGORIES, payload: resp.data });
    });
  };
};

export const createUser = (form) => {
  return function (dispatch) {
    return axios
      .post(`/api/users/signup`, form)
      .then((resp) => {
        alert(resp.data.message);
        localStorage.setItem("token_id", resp.data.token);
        dispatch({ type: GET_USER, payload: resp.data.user });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
};

export const updateGoogleAuthErrorMessage = (msg) => {
  return {
    type: UPDATE_GOOGLE_AUTH_ERROR_MESSAGE,
    payload: msg,
  };
};

export const updateLoginErrorMessage = (msg) => {
  return {
    type: LOGIN_ERROR_MESSAGE,
    payload: msg,
  };
};
export const addQuestion = (payload) => {

  return function (dispatch) {
    return axios
      .post(`http://localhost:3001/api/questions/`, payload)
      .then((resp) => {
      dispatch({ type: ADD_QUESTION})
      dispatch(getQuestionsWithAnswers(payload.productId));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const getQuestionsWithAnswers = (productId) => {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/api/questions/${productId}`)
      .then((resp) => {
        dispatch({ type: GET_QUESTIONS_WITH_ANSWERS, payload: resp.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
};