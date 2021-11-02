const initialState = {
  data: {},
  details: {},
  errMseg: '',
  message: '',
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'UPDATE_PROFILE': {
      return {
        ...state,
        details: action.payload.data,
        message: action.payload.message
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default profile;
