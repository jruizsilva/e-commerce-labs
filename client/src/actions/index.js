import { GET_ALL_PRODUCTS, SORT_BY_VALUE } from './types';
import axios from 'axios';

export const getAllProducts = () => {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/api/products`).then(resp => {
      dispatch({ type: GET_ALL_PRODUCTS, payload: resp.data });
    });
  };
};

export const sortByValue = payload => {
  return {
    type: SORT_BY_VALUE,
    payload,
  };
};
