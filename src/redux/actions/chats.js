/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import {BACKEND_URL} from '@env';

// export const getChatList = token => {
//   return async dispatch => {
//     const {data} = await http(token).get(`${BACKEND_URL}/chats/`);
//     console.log(data);
//     dispatch({
//       type: 'CHATLIST_GET',
//       payload: data.results,
//     });
//   };
// };
export const getChatList = (token) => {
  return async (dispatch) => {
    try {
      const {data} = await http(token).get(`${BACKEND_URL}/chats/`);
      console.log(data);
      dispatch({
      type: 'CHATLIST_GET',
      payload: data.results,
    });
    } catch (err){
      dispatch({
        type: 'CHATLIST_GET_FAILED',
        payload: err.response.data.message,
    });
    }
  };
};


export const getChatRoom = (token, recipient) => {
  return async dispatch => {
    const {data} = await http(token).get(
      `${BACKEND_URL}/chats/mobilechatroom/?recipient=${recipient}`,
    );
    dispatch({
      type: 'CHATROOMS_GET',
      payload: data.results,
    });
  };
};

export const deleteChatRoom = (token, recipient) => {
  return async dispatch => {
    const {data} = await http(token).delete(
      `${BACKEND_URL}/chats/deletechats/?recipient=${recipient}`,
    );
    dispatch({
      type: 'DELETE_CHATROOM',
      payload: data.message,
    });
  };
};


export const sendMessage = (token, recipient, message) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('recipient', recipient);
    form.append('message', message);
    const {data} = await http(token).post(
      `${BACKEND_URL}/chats/sendmessage`,
      form.toString(),
    );
    dispatch({
      type: 'SEND_MESSAGE',
      payload: data.message,
    });
  };
};

export const sendMessageWithImage = (token, recipient, message, img) => {
  console.log("ini data di action", message, img);
  return async dispatch => {
    if(img !== null){
      const form = new FormData();
      form.append('img', {
        uri: img,
        name: 'sendingImage.jpg',
        type: 'image/jpeg',
      });
      form.append('message', message);
      const {data} = await http(token).post(
        `${BACKEND_URL}/chats/sendimage/?recipient=${recipient}`,
        form,
      );
      dispatch({
        type: 'SEND_MESSAGE_IMG',
        payload: data.message,
      });
    }else{
      const form = new URLSearchParams();
      form.append('recipient', recipient);
      form.append('message', message);
      const {data} = await http(token).post(
        `${BACKEND_URL}/chats/sendmessage`,
        form.toString(),
      );
      dispatch({
        type: 'SEND_MESSAGE',
        payload: data.message,
      });
    }
  };
};

export const searchUsers = (search, token) => {
  if (!search.startsWith('http')){
    return async (dispatch) => {
      const {data} = await http(token).get(`${BACKEND_URL}/chats/searchinguser/?search=${search}`,);
      dispatch({
        type: 'SEARCH_USER',
        payload: {
          user: data.results,
          pageInfo: data.pageInfo,
        },
    });
    };
  } else {
    return async (dispatch) => {
      const {data} = await http(token).get(search);
      dispatch({
        type: 'SEARCH_USER_GET_NEXT',
        payload: {
          user: data.results,
          pageInfo: data.pageInfo,
        },
      });
    };
  }
};

export const clearMessage = () =>({
  type: 'CLEAR_MESSAGE',
});