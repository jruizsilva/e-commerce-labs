import { GET_ALL_PRODUCTS, GET_USER } from "../actions/types"

const initialState = {
    allProducts: [],
    user: {}
}

export default function reducer(state = initialState, actions){
  switch (actions.type) {
    case GET_ALL_PRODUCTS:
      return {
          ...state,
          allProducts: actions.payload
      }
    case GET_USER:
      return {
          ...state,
          user: actions.payload
      }
    default:
       return state;
  }
}