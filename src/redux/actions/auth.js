/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import toastMessage from '../../helpers/showMessage';
import {BACKEND_URL} from '@env';

export const authLogin = (email, password, navigation) => {
  return async dispatch => {
      console.log(email,password);
    const form = new URLSearchParams();
    form.append('email', email);
    form.append('password', password);
    try {
      const {data} = await http().post(`${BACKEND_URL}/auth/login`,  form.toString());
      console.log('ini data', data.message);
      dispatch({
        type: 'AUTH_LOGIN',
        payload: {
          token: data.results.token,
          sccMsg: data.message,
        },
      });
      // navigation.reset({index: 0, routes: [{name: 'home'}]});
      navigation.navigate('home');
    } catch (err) {
        console.log('ini eror kenapa' ,err);
      dispatch({
        type: 'AUTH_LOGIN_FAILED',
        payload: err.response.data.message,
      });
      showMessage({
        message: 'Wrong email or password',
        type: 'info',
      });
    }
  };
};

export const authLogOut = () =>({
        type: 'AUTH_LOGOUT',
  });

export const authRegister = (email, password, phoneNumber) => {
    return async (dispatch) => {
      const form = new URLSearchParams();
      form.append('email', email);
      form.append('password', password);
      form.append('phoneNumber', phoneNumber);
      try {
        const {data} = await http().post(`${BACKEND_URL}/auth/register`, form.toString());
        dispatch({
          type: 'AUTH_REGISTER',
          payload: data.message,
      });
      } catch (err){
        dispatch({
          type: 'AUTH_REGISTER_FAILED',
          payload: err.response.data.message,
      });
      }
    };
  };

  export const clearRegistMessage = () => ({
    type: 'SET_CLEAR_REGIST_MESSAGE',
  });

  export const clearLoginMessage = () => ({
    type: 'SET_CLEAR_LOGIN_MESSAGE',
  });
