/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';

const toastMessage = (message, type) => {
  showMessage({
    message,
    type: type === 'success' ? 'success' : 'danger',
    backgroundColor: type === 'success' ? '#6A4029' : '#d63031',
    color: '#fff',
  });
};

export default toastMessage;
