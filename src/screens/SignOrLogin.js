/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Button from '../components/Button';
import ButtonYellow from '../components/ButtonYellow';

export default class SignOrLogin extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Image style={styles.banner} source={require('../assets/bannerLoginSignUp.png')} />
        <View style={styles.child}/>
        <View style={styles.title}>
            <Text style={styles.titleText}>Welcome</Text>
            <View style={styles.button} >
                <Button buttonName="Create New Account" routeName="signup"/>
            </View>
            <View style={styles.button2} >
                <ButtonYellow buttonName="Login" routeName="login"/>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  banner: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  child: {
    position: 'absolute',
    height: 900,
    width: 400,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    position: 'absolute',
    marginTop: 90,
  },
  titleText: {
      fontSize: 58,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  button: {
      position: 'absolute',
      marginTop: 325,
      marginLeft: -20,
  },
  button2: {
    position: 'absolute',
    marginTop: 400,
    marginLeft: -20,
},
});
