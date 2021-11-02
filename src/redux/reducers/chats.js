/* eslint-disable prettier/prettier */
const initialState = {
  chatroom: {},
  chatlist: {},
  errMsg: '',
  sccMsg: '',
};

const chats = (state = initialState, action) => {
  switch (action.type) {
    case 'CHATLIST_GET': {
      return {
        ...state,
        chatlist: action.payload,
      };
    }
    case 'CHATROOMS_GET': {
      return {
        ...state,
        chatroom: action.payload,
      };
    }
    case 'CHATROOMS_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'SEND_MESSAGE': {
      return {
        ...state,
        sccMsg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default chats;
