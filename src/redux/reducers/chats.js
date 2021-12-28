/* eslint-disable prettier/prettier */
const initialState = {
  chatroom: {},
  chatlist: {},
  errMsg: '',
  errMsg2: '',
  sccMsg: '',
  search: {},
  pageInfo: {},
};

const chats = (state = initialState, action) => {
  switch (action.type) {
    case 'CHATLIST_GET': {
      return {
        ...state,
        chatlist: action.payload,
      };
    }
    case 'CHATLIST_GET_FAILED': {
      return {
        ...state,
        errMsg2: action.payload,
      };
    }
    case 'CHATROOMS_GET': {
      return {
        ...state,
        chatroom: action.payload,
      };
    }
    case 'SEARCH_USER': {
      return {
        ...state,
        search: action.payload.user,
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'SEARCH_USER_GET_NEXT': {
      return {
        ...state,
        search:[
          ...state.data,
          ...action.payload.products,
        ],
        pageInfo: action.payload.pageInfo,
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
    case 'SEND_MESSAGE_IMG': {
      return {
        ...state,
        sccMsg: action.payload,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        sccMsg: "",
      };
    }
    case 'DELETE_CHATROOM': {
      return {
        ...state,
        deleteMsg: action.payload,
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
