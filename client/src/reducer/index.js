import { GET_ALL_PRODUCTS, GET_NAME_PRODUCT } from "../actions/types"

const initialState = {
    allProducts: []
}

export default function reducer(state = initialState, actions){
  switch (actions.type) {
    case GET_ALL_PRODUCTS:
        return {
            ...state,
            allProducts: actions.payload
        }
    case GET_NAME_PRODUCT:
        return {
          ...state,
          allProducts:actions.payload
        }
    default:
       return state;
  }
}