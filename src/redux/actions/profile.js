import http from '../../helpers/http';
import {BACKEND_URL} from '@env';

export const getProfile = token => {
  return async dispatch => {
    const {data} = await http(token).get(`${BACKEND_URL}/private/profile`);
    dispatch({
      type: 'GET_PROFILE',
      payload: {
        user: data.results,
      },
    });
  };
};

export const editPutProfile = (data, token) => {
  return async dispatch => {
    const form = new FormData();
    form.append('img', {
      uri: data.img,
      name: 'example.jpg',
      type: 'image/jpeg',
    });
    form.append('name', data.name);
    form.append('email', data.email);
    form.append('phoneNumber', data.phoneNumber);
    form.append('address', data.address);
    const {data: userData} = await http(token).put(
      `${BACKEND_URL}/private/profile`,
      form,
    );
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        data: userData.results,
        message: userData.message,
      },
    });
  };
};
