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
  SET_REGISTER_ERROR_MESSAGE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  ADD_QUESTION,
  GET_QUESTIONS_WITH_ANSWERS,
  ADD_TO_CART,
  ADD_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  ADD_ORDER,
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
  UPDATE_NOTIFICATIONS,
} from "../actions/types";

const initialState = {
  allProducts: [],
  categories: [],
  user: null,
  searchUser: true,
  loadingProducts: false,
  questionsWithAnswers: [],
  notifications:[],
  googleAuthErrorMessage: "",
  registerErrorMessage: "",
  loginErrorMessage: "",
  order:{},
  cart: {},
  cartSuccessMessage: "",
  cartErrorMessage: "",
  loadingProductCreation: false,
  successCreationMessage: "",
  errorCreationMessage: "",
  userPublications: [],
  productToEdit: null,
  editInitialValues: null,
  loadingUpdateProduct: false,
  successEditMessage: "",
  errorEditMessage: "",
  restorePasswordSuccessMessage: "",
  restorePasswordErrorMessage: "",
  mercadopago: null,
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
    case ADD_ORDER:
      return {
        ...state,
      };
    case GET_QUESTIONS_WITH_ANSWERS:
      return {
        ...state,
        questionsWithAnswers: actions.payload,
      };
    case ADD_QUESTION:
      return {
        ...state,
      };
    case ADD_NOTIFICATIONS:
      return {
        ...state,
      };
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications : actions.payload,
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
      return {
        ...state,
        searchUser: actions.payload,
      };
    case LOGIN_ERROR_MESSAGE:
      return { ...state, loginErrorMessage: actions.payload };

    case RESTORE_PASSWORD_SUCCESS_MESSAGE:
      return { ...state, restorePasswordSuccessMessage: actions.payload };
    case RESTORE_PASSWORD_ERROR_MESSAGE:
      return { ...state, restorePasswordErrorMessage: actions.payload };

    case SET_REGISTER_ERROR_MESSAGE:
      return { ...state, registerErrorMessage: actions.payload };

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
    case RESET_MESSAGES: {
      return {
        ...state,
        successCreationMessage: "",
        errorCreationMessage: "",
        successEditMessage: "",
        errorEditMessage: "",
        googleAuthErrorMessage: "",
        registerErrorMessage: "",
        loginErrorMessage: "",
        cartSuccessMessage: "",
        cartErrorMessage: "",
        restorePasswordErrorMessage: "",
        restorePasswordSuccessMessage: "",
      };
    }
    case ADD_TO_CART:
      return { ...state, cart: actions.payload };
    case "ADD_PRODUCT_STORAGE":
      let productCart = actions.payload;
      if (state.cart.productcarts && state.cart.productcarts[0]) {
        let findPr = state.cart.productcarts.find(
          (val) => val.productId === productCart.productId
        );
        if (findPr) alert("the product already exists");
        else {
          let totalValue = state.cart.productcarts
            .map((val) => val.totalValue)
            .reduce((a, b) => a + b, 0);
          totalValue += productCart.totalValue;
          return {
            ...state,
            cart: {
              totalValue,
              productcarts: [...state.cart.productcarts, productCart],
            },
          };
        }
      } else {
        let cart = {
          totalValue: productCart.totalValue,
          productcarts: [productCart],
        };
        return { ...state, cart };
      }
      break;
    case "UPDATE_PRODUCT_STORAGE":
      const { idProduct, price, cant } = actions.payload;
      let pcs = state.cart.productcarts;
      let totalValue;
      state.cart.productcarts.forEach((val, i) => {
        if (val.productId === idProduct) {
          pcs[i].quantity = pcs[i].quantity + cant;
          pcs[i].totalValue = pcs[i].totalValue + price * cant;
        }
      });
      totalValue = state.cart.productcarts
        .map((val) => val.totalValue)
        .reduce((a, b) => a + b, 0);
      return {
        ...state,
        cart: { ...state.cart, totalValue, productcarts: pcs },
      };

    case "DELETE_PRODUCT_STORAGE":
      let productcarts = state.cart.productcarts.filter(
        (val) => val.productId !== actions.payload
      );
      let totalVal = productcarts
        .map((val) => val.totalValue)
        .reduce((a, b) => a + b, 0);
      return {
        ...state,
        cart: { ...state.cart, totalValue: totalVal, productcarts },
      };
    case UPDATE_CART_SUCCESS_MESSAGE:
      return { ...state, cartSuccessMessage: actions.payload };

    case UPDATE_CART_ERROR_MESSAGE:
      return { ...state, cartErrorMessage: actions.payload };

    case GET_USER_PUBLICATIONS:
      return { ...state, userPublications: actions.payload };
    case SET_PRODUCT_TO_EDIT:
      return { ...state, productToEdit: actions.payload };
    case SET_EDIT_INITIAL_VALUES:
      return { ...state, editInitialValues: actions.payload };
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loadingUpdateProduct: true };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingUpdateProduct: false,
        successEditMessage: actions.payload,
      };
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        loadingUpdateProduct: false,
        errorEditMessage: actions.payload,
      };

    case MERCADO_PAGO:
      return {
        ...state,
        mercadopago: actions.payload,
      };
    default:
      return state;
  }
}
