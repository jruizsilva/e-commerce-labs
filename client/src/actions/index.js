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
  SET_REGISTER_ERROR_MESSAGE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_QUESTIONS_WITH_ANSWERS,
  ADD_QUESTION,
  ELIMINATE_FROM_CART,
  UPDATE_NOTIFICATIONS,
  ADD_TO_CART,
  GET_NOTIFICATIONS,
  ADD_NOTIFICATIONS,
  UPDATE_CART_SUCCESS_MESSAGE,
  UPDATE_CART_ERROR_MESSAGE,
  GET_USER_PUBLICATIONS,
  SET_PRODUCT_TO_EDIT,
  SET_EDIT_INITIAL_VALUES,
  RESET_MESSAGES,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  RESTORE_PASSWORD_SUCCESS_MESSAGE,
  RESTORE_PASSWORD_ERROR_MESSAGE,
  MERCADO_PAGO,
  ADD_ORDER,
  MY_PURCHASES,
  UPDATE_NOTIFICATIONS_BY_PRODUCT,
  ADD_ANSWER,
  SET_REGISTER_SUCCESS_MESSAGE,
  FETCH_ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_ERROR,
  GET_PRODUCT_REVIEWS,
} from "./types";
import axios from "axios";

export const getAllProducts = (search, userId) => {
  const URL = userId
    ? `/api/products/${userId}${search}`
    : `/api/products${search}`;
  return function (dispatch) {
    dispatch(loadingProducts(true));
    return axios
      .get(URL)
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
      const json = await axios.get("/api/products/product/search?name=" + name);
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
        localStorage.setItem("token_id", resp.data.token);
        dispatch(getUser(resp.data.token));
      })
      .catch((err) => {
        console.log(err.response.data.message);
        dispatch(updateGoogleAuthErrorMessage(err.response.data.message));
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 3000);
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
        dispatch(getNotificationsByUserId(resp.data.user.id));
        dispatch(updateLoginErrorMessage(""));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(updateLoginErrorMessage(err.response.data.message));
        // alert(err.response.data.message);
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 3000);
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
        dispatch(getCart(resp?.data?.id));
        dispatch(validateCartStorage(resp?.data?.id));
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
        localStorage.setItem("token_id", resp.data.token);
        dispatch({ type: RESET_MESSAGES });
        dispatch(setRegisterSuccessMessage(resp.data.message));
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 2000);
        dispatch(getUser(resp.data.token));
      })
      .catch((err) => {
        dispatch(setRegisterErrorMessage(err.response.data.message));
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 3000);
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
export const setRegisterErrorMessage = (msg) => {
  return {
    type: SET_REGISTER_ERROR_MESSAGE,
    payload: msg,
  };
};

export const addProductToCart = (productId, userId) => {
  return function (dispatch) {
    dispatch({ type: RESET_MESSAGES });
    return axios
      .post(`/api/cart/addProduct`, { productId, userId, quantity: 1 })
      .then((resp) => {
        dispatch(getCart(userId));
        dispatch(updateCartSuccessMessage("Product added successfully"));
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 2000);
      })
      .catch((err) => {
        dispatch(updateCartErrorMessage(err.response.data));
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 2000);
      });
  };
};

export const addOrder = (payload) => {
  return function (dispatch) {
    return axios
      .post(`/api/mercadopago`, payload)
      .then((resp) => {
        dispatch({ type: ADD_ORDER });
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};
export const getCart = (userId) => {
  return function (dispatch) {
    return axios.get(`/api/cart?id=${userId}`).then((resp) => {
      dispatch({ type: ADD_TO_CART, payload: resp.data[0] });
    });
  };
};

export const changeQuantityCart = (productCardId, price, val, userId) => {
  return function (dispatch) {
    return axios
      .put(`/api/cart`, { productCardId, price, val })
      .then((resp) => {
        console.log(resp);
        dispatch(getCart(userId));
      });
  };
};
export const deleteProductCart = (productCardId, userId) => {
  return function (dispatch) {
    return axios
      .delete(`/api/cart?productCardId=${productCardId}`)
      .then((resp) => {
        dispatch(getCart(userId));
        dispatch(updateCartSuccessMessage("Product removed successfully"));
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 2000);
      });
  };
};
export const validateCartStorage = (userId) => {
  let cartStorage = JSON.parse(localStorage.getItem("cart"));
  return function (dispatch) {
    if (cartStorage && cartStorage.productcarts[0]) {
      let promises = cartStorage.productcarts.map(async (val) => {
        return axios.post(`/api/cart/addProduct`, {
          productId: val.productId,
          userId,
          quantity: val.quantity,
        });
      });
      Promise.all(promises)
        .then((resp) => {
          console.log(resp);
          localStorage.removeItem("cart");
          dispatch(getCart(userId));
        })
        .catch(() => {
          console.log("err");
          localStorage.removeItem("cart");
          dispatch(getCart(userId));
        });
    }
  };
};

export const updateCartSuccessMessage = (msg) => {
  return { type: UPDATE_CART_SUCCESS_MESSAGE, payload: msg };
};
export const updateCartErrorMessage = (msg) => {
  return { type: UPDATE_CART_ERROR_MESSAGE, payload: msg };
};

export const createProduct = (body) => {
  console.log(body);
  return async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    axios
      .post("/api/products/create", body)
      .then((res) => {
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data });
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 2000);
      })
      .catch((err) => {
        console.log("error create product", err);
        dispatch({ type: CREATE_PRODUCT_ERROR, payload: err.message });
        setTimeout(() => {
          dispatch({ type: RESET_MESSAGES });
        }, 2000);
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
        dispatch(
          addNotification(
            payload.sellerId,
            payload.productId,
            payload.productName,
            "comment"
          )
        );
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const addAnswer = ({
  answer,
  questionId,
  productId,
  productName,
  customerId,
}) => {
  console.log(answer, questionId, productId);
  return function (dispatch) {
    return axios
      .post(`/api/answers/`, { answer, questionId })
      .then((resp) => {
        dispatch({ type: ADD_ANSWER });
        dispatch(getQuestionsWithAnswers(productId));
        dispatch(addNotification(customerId, productId, productName, "answer"));
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

export const getUserPublications = (userId, search = "") => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/users/${userId}/publications${search}`);
      dispatch({ type: GET_USER_PUBLICATIONS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setProductToEdit = (productToEdit) => {
  return { type: SET_PRODUCT_TO_EDIT, payload: productToEdit };
};
export const setEditInitialValues = (editInitialValues) => {
  return { type: SET_EDIT_INITIAL_VALUES, payload: editInitialValues };
};

export const updateProduct = (form, userId, publicationId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const res = await axios.put(
        `/api/users/${userId}/publication/${publicationId}`,
        form
      );
      console.log(res.data);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data.message });
      setTimeout(() => {
        dispatch({ type: RESET_MESSAGES });
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_PRODUCT_ERROR, payload: error });
      setTimeout(() => {
        dispatch({ type: RESET_MESSAGES });
      }, 2000);
    }
  };
};
export const getNotificationsByUserId = (userId) => {
  return function (dispatch) {
    return axios
      .get(`/api/notifications/${userId}`)
      .then((resp) => {
        dispatch({ type: GET_NOTIFICATIONS, payload: resp.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const updateNotificationsByUserId = (userId) => {
  return function (dispatch) {
    return axios
      .put(`/api/notifications`, { userId: userId })
      .then((resp) => {
        dispatch({ type: UPDATE_NOTIFICATIONS, payload: resp.data });
        dispatch(getNotificationsByUserId(userId));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const updateNotificationsByProduct = (notificationId, userId) => {
  return function (dispatch) {
    return axios
      .put(`/api/notifications/${notificationId}`, { userId: userId })
      .then((resp) => {
        dispatch({ type: UPDATE_NOTIFICATIONS_BY_PRODUCT, payload: resp.data });
        dispatch(getNotificationsByUserId(userId));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const addNotification = (
  userId,
  productId,
  productName,
  messageFrom
) => {
  let message = "";
  if (messageFrom === "comment") {
    message = `You have a ${messageFrom} on your publication ${productName}.`;
  }
  if (messageFrom === "answer") {
    message = `The seller ${messageFrom} you on the publication ${productName}.`;
  }
  const payload = { userId, productId, message };
  return function (dispatch) {
    return axios
      .post(`/api/notifications/`, payload)
      .then((resp) => {
        dispatch({ type: ADD_NOTIFICATIONS, payload: resp.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const setRestorePasswordSuccessMessage = (msg) => {
  return { type: RESTORE_PASSWORD_SUCCESS_MESSAGE, payload: msg };
};

export const setRestorePasswordErrorMessage = (msg) => {
  return { type: RESTORE_PASSWORD_ERROR_MESSAGE, payload: msg };
};

export const setMercadoPago = (data) => {
  return { type: MERCADO_PAGO, payload: data };
};

export const getMyPurchases = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}/my-purchases`);
      dispatch({ type: MY_PURCHASES, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const setRegisterSuccessMessage = (msg) => {
  return { type: SET_REGISTER_SUCCESS_MESSAGE, payload: msg };
};

export const fetchAddReview = (userId, productId, body) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ADD_REVIEW });
    try {
      const response = await axios.put(
        `/api/users/${userId}/review/${productId}`,
        body
      );
      console.log(response);
      dispatch({
        type: ADD_REVIEW_SUCCESS,
        payload: response.data.message || "Success",
      });
      setTimeout(() => {
        dispatch({ type: RESET_MESSAGES });
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_REVIEW_ERROR,
        payload: error.data.message || "Error",
      });
      setTimeout(() => {
        dispatch({ type: RESET_MESSAGES });
      }, 2000);
    }
  };
};

export const getProductReviews = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${productId}/reviews`);
      console.log(response);
      dispatch({
        type: GET_PRODUCT_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
