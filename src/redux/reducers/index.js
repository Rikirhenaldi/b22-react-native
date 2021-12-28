/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import createAsyncStorage from 'redux-persist-react-native-async-storage';

import auth from './auth';
import products from './products';
import carts from './carts';
import profile from './profile';
import payment from './payment';
import chats from './chats';
import history from './history';
import { globalReducer } from './global';

const storage = createAsyncStorage();

const persistAuth = {
  storage,
  key: 'auth',
};
const rootReducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  products,
  carts,
  globalReducer,
  profile,
  payment,
  chats,
  history,
});

export default rootReducer;
