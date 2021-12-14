/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import {BACKEND_URL} from '@env';


export const getHistory = (token) => {
    console.log({BACKEND_URL});
    return async dispatch => {
      try {
        const {data} = await http(token).get(`${BACKEND_URL}/private/profile/history_transactions`);
        dispatch({
          type: 'GET_HISTORY',
          payload: data.results,
        });
      } catch (err){
        console.log('ini kenapa', err);
      }
    };
};

export const getDetailHistory = (id, token) => {
  return async (dispatch) => {
    try {
      const {data} = await http(token).get(`${BACKEND_URL}/private/profile/history_transactions/${id}`);
      dispatch({
        type: 'GET_DETAIL_HISTORY',
        payload: data.results,
      });
    } catch (err){
      console.log('ini kenapa', err);
    }
  };
};

export const deleteHistory = (id, token) => {
  console.log('ini id di action', id);
  return async (dispatch) => {
    try {
      const {data} = await http(token).get(`${BACKEND_URL}/private/profile/delete_history/${id}`);
      dispatch({
        type: 'DELETE_HISTORY',
        payload: data.message,
      });
    } catch (err){
      console.log('ini kenapa', err);
    }
  };
};


