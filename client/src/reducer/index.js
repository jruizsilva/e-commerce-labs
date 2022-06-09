import { GET_ALL_PRODUCTS } from "../actions/types"

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
    default:
       return state;
  }
}