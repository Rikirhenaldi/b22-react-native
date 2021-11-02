/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const ButtonAction = ({buttonName,action}) => {
    return (
      <TouchableOpacity onPress={action} style={styles.button}>
      <Text style={styles.buttonText}>{buttonName}</Text>
      </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
  button: {
    width: 290,
    height: 60,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ButtonAction;
