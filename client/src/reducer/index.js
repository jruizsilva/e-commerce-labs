import {
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_NAME_PRODUCT,
  SORT_BY_VALUE,
  GET_CATEGORIES,
  LOADING_PRODUCTS,
  LOADING_USER,
  UPDATE_GOOGLE_AUTH_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
} from "../actions/types";

const initialState = {
  allProducts: [],
  categories: [],
  user: null,
  searchUser: true,
  loadingProducts: false,
  googleAuthErrorMessage: "",
  loginErrorMessage: "",
  loadingProductCreation: false,
  successCreationMessage: "",
  errorCreationMessage: "",
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: actions.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: actions.payload,
      };
    case SORT_BY_VALUE:
      const info = state.allProducts;
      const sortedArr =
        actions.payload === "AZ"
          ? info.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : actions.payload === "ZA"
          ? info.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            })
          : actions.payload === "HIGH"
          ? info.sort(function (a, b) {
              if (Number(a.price) > Number(b.price)) return -1;
              if (Number(b.price) > Number(a.price)) return 1;
              return 0;
            })
          : info.sort(function (a, b) {
              if (Number(a.price) > Number(b.price)) return 1;
              if (Number(b.price) > Number(a.price)) return -1;
              return 0;
            });
      return {
        ...state,
        allProducts: sortedArr,
      };
    case GET_NAME_PRODUCT:
      return {
        ...state,
        allProducts: actions.payload,
      };
    case LOADING_PRODUCTS:
      return {
        ...state,
        loadingProducts: actions.payload,
      };
    case UPDATE_GOOGLE_AUTH_ERROR_MESSAGE:
      return {
        ...state,
        googleAuthErrorMessage: actions.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: actions.payload,
      };
    case LOADING_USER:
      return { ...state, searchUser: actions.payload };
    case LOGIN_ERROR_MESSAGE:
      return { ...state, loginErrorMessage: actions.payload };

    case CREATE_PRODUCT_REQUEST:
      return { ...state, loadingProductCreation: true };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingProductCreation: false,
        successCreationMessage: actions.payload,
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        loadingProductCreation: false,
        errorCreationMessage: actions.payload,
      };
    default:
      return state;
  }
}
