/* eslint-disable prettier/prettier */
export const addProducts = (item, amount, index) => {
  return {
    type: 'CARTS_ADD_ITEM',
    payload: {item, order: {amount: amount, id: index}},
  };
};

export const deleteProducts = payload => {
  return {
    type: 'DELETE_CART_ITEM',
    payload,
  };
};

export const sumAmount = id => {
  return {
    type: 'ADD_MORE_AMOUNT',
    payload: {id},
  };
};

export const minAmount = id => {
  return {
    type: 'ADD_MIN_AMOUNT',
    payload: {id},
  };
};
