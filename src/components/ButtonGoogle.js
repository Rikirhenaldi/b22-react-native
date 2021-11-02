/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ButtonGoogle = ({buttonName,routeName}) => {
  const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={()=> {navigation.navigate(routeName);}} style={styles.button}>
      <Text style={styles.buttonText}><Image
          style={styles.logo}
          source={require('../assets/google.png')}
        /> {buttonName}</Text>
      </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
  button: {
    width: 290,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    height: 40,
  },
  logo: {
    marginRight: 10,
  },
});
export default ButtonGoogle;
