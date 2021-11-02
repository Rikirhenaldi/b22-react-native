/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import {BACKEND_URL} from '@env';


export const getProducts = () => {
    console.log({BACKEND_URL});
    return async dispatch => {
      try {
        const {data} = await http().get(`${BACKEND_URL}/products/`);
        dispatch({
          type: 'PRODUCTS_GET',
          payload: {
            products: data.results,
            pageInfo: data.pageInfo,
          },
        });
      } catch (err){
        console.log('ini kenapa', err);
      }
    };
};

export const getDetails = (id) => {
  return async (dispatch) => {
    const {data} = await http().get(`${BACKEND_URL}/products/${id}`);
    dispatch({
      type: 'PRODUCTS_GET_DETAILS',
      payload: {
        item: data.results,
        order : data.order,
      },

    });
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    const {data} = await http().get(`${BACKEND_URL}/category/`);
    dispatch({
      type: 'CATEGORIES_GET',
      payload: data.results,
    });
  };
};

export const getProductByCategories = (id) => {
  return async (dispatch) => {
    const {data} = await http().get(`${BACKEND_URL}/products/category/${id}`);
    dispatch({
      type: 'PRODUCT_CATEGORIES_GET',
      payload: {
        products: data.results,
        pageInfo: data.pageInfo,
      },
    });
  };
};

export const searchProducts = (search, sort, type) => {
  if (sort === undefined){
    sort = 'price';
  }
  if (!search.startsWith('http')){
    return async (dispatch) => {
      const {data} = await http().get(`${BACKEND_URL}/products/?search=${search}&col=${sort}&type=${type}`,);
      dispatch({
        type: 'SEARCH_PRODUCT',
        payload: {
          products: data.results,
          pageInfo: data.pageInfo,
        },
    });
    };
  } else {
    return async (dispatch) => {
      const {data} = await http().get(search);
      dispatch({
        type: 'SEARCH_GET_NEXT',
        payload: {
          products: data.results,
          pageInfo: data.pageInfo,
        },
      });
    };
  }
};
