import { GET_ALL_PRODUCTS, GET_USER, GET_NAME_PRODUCT, SORT_BY_VALUE, GET_CATEGORIES } from "../actions/types"

const initialState = {
    allProducts: [],
    categories: [],
    user: {}
}

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
          user: actions.payload
      }
    case SORT_BY_VALUE:
      const info = state.allProducts;
      const sortedArr =
        actions.payload === 'AZ'
          ? info.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : actions.payload === 'ZA'
          ? info.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            })
          : actions.payload === 'HIGH'
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
          allProducts:actions.payload
        }
    case GET_CATEGORIES:
      return {
        ...state,
        categories:actions.payload
      }
    default:
      return state;
  }
}
