const initialState = {
  data: [],
};

const carts = (state = initialState, action) => {
  switch (action.type) {
    case 'CARTS_ADD_ITEM': {
      return {
        ...state,
        data: [...state.data, ...[action.payload]],
      };
    }
    case 'ADD_MORE_AMOUNT': {
      let data = [...state.data];
      const increamentItem = data.find(
        product => product.order.id === action.payload.id,
      );
      console.log(increamentItem);
      increamentItem.order.amount += 1;
      return {
        ...state,
      };
    }
    case 'ADD_MIN_AMOUNT': {
      let data = [...state.data];
      const decreamentItem = data.find(
        product => product.order.id === action.payload.id,
      );
      // console.log(increamentItem);
      decreamentItem.order.amount -= 1;
      return {
        ...state,
      };
    }
    case 'SET_CLEAR_ITEM':
      return {
        ...state,
        data: [],
      };
    case 'SET_UPDATE_ITEM':
      return {
        ...state,
        products: action.payload,
      };
    case 'DELETE_CART_ITEM': {
      const data = [...state.data];
      data.splice(action.payload, 1);
      return {
        ...state,
        data,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default carts;
