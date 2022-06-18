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
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_QUESTIONS_WITH_ANSWERS,
  ADD_QUESTION,
  ELIMINATE_FROM_CART,
  ADD_TO_CART,
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
        dispatch(getUser(resp.data.token));
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
        dispatch(getUser(resp.data.token));
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
        dispatch(getCart(resp.data.id));
        dispatch(validateCartStorage(resp.data.id));
      })
      .catch((err) => {
        console.log("Error:", err);
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
        dispatch(getUser(resp.data.token));
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

export const addProductToCart = (productId, userId) => {
  return function(dispatch){
    return axios.post(`/api/cart/addProduct`, {productId, userId, quantity: 1})
      .then((resp)=>{
        console.log(resp.data);
        dispatch(getCart(userId));
      }).catch((err)=>{
        alert(err.response.data);
      })
  }
}
export const getCart = (userId) => {
  return function(dispatch){
    return axios.get(`/api/cart?id=${userId}`)
      .then((resp)=>{
        dispatch({type: ADD_TO_CART, payload: resp.data[0]})
      })
  }
}
export const changeQuantityCart = (productCardId, price, val, userId) => {
  return function(dispatch){
    return axios.put(`/api/cart`, {productCardId, price, val})
      .then((resp)=>{
        console.log(resp)
        dispatch(getCart(userId));  
      })
  }
}
export const deleteProductCart = (productCardId, userId) => {
  return function(dispatch){
    return axios.delete(`/api/cart?productCardId=${productCardId}`)
      .then((resp)=>{
        console.log(resp)
        dispatch(getCart(userId));  
      })
  }
}
export const validateCartStorage = (userId) => {
  let cartStorage = JSON.parse(localStorage.getItem("cart"));
  return function(dispatch){
    if(cartStorage && cartStorage.productcarts[0]){
      let promises = cartStorage.productcarts.map(async (val)=>{
        return axios.post(`/api/cart/addProduct`, {productId: val.productId, userId, quantity: val.quantity})
      })
      Promise.all(promises)
        .then((resp)=>{
          console.log(resp);
          localStorage.removeItem("cart");
          dispatch(getCart(userId));
        }).catch(()=>{
          console.log('err');
          localStorage.removeItem("cart");
          dispatch(getCart(userId));
        })
    }
  }
}
export const createProduct = (body) => {
  return (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    axios
      .post("/api/products/create", body)
      .then((res) => {
        alert(res.data.message);
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.message });
      })
      .catch((err) => {
        console.log(err);
        alert(err.data.message);
        dispatch({ type: CREATE_PRODUCT_ERROR, payload: err.message });
      });
  };
};

export const addQuestion = (payload) => {
  return function (dispatch) {
    return axios
      .post(`/api/questions/`, payload)
      .then((resp) => {
        dispatch({ type: ADD_QUESTION });
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
      .get(`/api/questions/${productId}`)
      .then((resp) => {
        dispatch({ type: GET_QUESTIONS_WITH_ANSWERS, payload: resp.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
};
