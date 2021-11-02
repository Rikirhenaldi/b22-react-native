/* eslint-disable prettier/prettier */
const initialState = {
  onAuth: false,
  token: null,
  errMsg: '',
  sccMsg: '',
  registSccMsg: '',
  registErrMsg: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN': {
      return {
        ...state,
        token: action.payload.token,
        sccMsg: action.payload.sccMsg,
      };
    }
    case 'AUTH_LOGIN_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'AUTH_REGISTER': {
      return {
        ...state,
        registSccMsg: action.payload,
      };
    }
    case 'AUTH_REGISTER_FAILED': {
      return {
        ...state,
        registErrMsg: action.payload,
      };
    }
    case 'AUTH_LOGOUT': {
      return {
        ...state,
        token: null,
        sccMsg: '',
        errMsg: '',
      };
    }
    case 'SET_CLEAR_REGIST_MESSAGE':
      return {
        ...state,
        registErrMsg: '',
        registSccMsg: '',
      };
    case 'SET_CLEAR_LOGIN_MESSAGE':
        return {
          ...state,
          sccMsg: '',
          errMsg: '',
        };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
