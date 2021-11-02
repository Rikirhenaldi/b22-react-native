const initialState = {
  sccMseg: '',
  errMseg: '',
};

const payment = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PAYMENT': {
      return {
        ...state,
        sccMseg: action.payload,
      };
    }
    case 'CREATE_PAYMENT_FAILED': {
      return {
        ...state,
        errMseg: action.payload,
      };
    }
    case 'SET_CLEAR_MESSAGE':
      return {
        ...state,
        sccMseg: "",
        errMseg: "",
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default payment;
