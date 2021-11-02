import http from '../../helpers/http';
import {BACKEND_URL} from '@env';

export const postPayment = (data, token) => {
  console.log('ini data', data);
  return async dispatch => {
    const form = new URLSearchParams();
    data.forEach(item => {
      form.append('product_id', item.order.id);
      form.append('product_amount', item.order.amount);
    });
    form.append('payment_method', null);
    try {
      const {data} = await http(token).post(
        `${BACKEND_URL}/private/transactions`,
        form.toString(),
      );
      dispatch({
        type: 'CREATE_PAYMENT',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'CREATE_PAYMENT_FAILED',
        payload: err.response.data.message,
      });
    }
  };
};

export const clearMessage = () => ({
  type: 'SET_CLEAR_MESSAGE',
});
