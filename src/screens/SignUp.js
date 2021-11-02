/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {FormControl, Input} from 'native-base';
import ButtonGoogle from '../components/ButtonGoogle';
import ButtonLogin from '../components/ButtonLogin';
import { authRegister } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { clearRegistMessage } from '../redux/actions/auth';
import { showMessage, hideMessage } from 'react-native-flash-message';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state =  {email: '', password: '', phoneNumber: ''};
  }
  onRegister = (e) =>{
    e.preventDefault();
    const {email, password, phoneNumber} = this.state;
    this.props.authRegister(email, password, phoneNumber);
    setTimeout(() => {
      this.props.clearRegistMessage();
    }, 90);
    const msg = this.props.auth.sccMesg;
      console.log(msg);
      if (msg !== ''){
        showMessage({
          message: 'Register Success',
          type: 'info',
        });
        this.props.navigation.navigate('login');
      } else {
        hideMessage({
          message: 'Regist Success',
          type: 'info',
        });
      }
  }
  render() {
    return (
      <View style={styles.parent}>
        <Image
          style={styles.banner}
          source={require('../assets/bannerSignUp.png')}
        />
        <View style={styles.child} />
        <View style={styles.title}>
          <Text style={styles.titleText}>SignUp</Text>
        </View>
        <FormControl style={styles.inputStyle}>
          <Input
            style={styles.button2}
            w="82%"
            p={3}
            placeholder="Enter your email adress"
            placeholderTextColor="white"
            color="white"
            variant="underlined"
            value={this.state.email}
            onChangeText={(value)=> this.setState({email: value})}
          />
          <Input
            style={styles.button2}
            w="82%"
            p={3}
            placeholder="Enter your Password"
            placeholderTextColor="white"
            color="white"
            variant="underlined"
            type={false ? 'text' : 'password'}
            value={this.state.password}
            onChangeText={(value)=> this.setState({password: value})}
          />
          <Input
            style={styles.button2}
            w="82%"
            p={3}
            placeholder="Enter your phone number"
            placeholderTextColor="white"
            color="white"
            variant="underlined"
            value={this.state.phoneNumber}
            onChangeText={(value)=> this.setState({phoneNumber: value})}
          />
          <View style={styles.button2}>
            <ButtonLogin buttonName="Create Account" action={this.onRegister}/>
          </View>
          <View style={styles.button2}>
            <ButtonGoogle buttonName= " Create with Google" />
          </View>
        </FormControl>
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
    position: 'absolute',
    top: -80,
  },
  child: {
    position: 'absolute',
    height: 900,
    width: 400,
  },
  title: {
    position: 'absolute',
    marginTop: 70,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 58,
    color: 'white',
    fontWeight: 'bold',
  },
  button2: {
    marginTop: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
  forgotPass: {
    width: 280,
  },
  inputStyle: {
    position: 'absolute',
    marginTop: 210,
    alignItems: 'center',
    height: 400,
  },
  orLogin: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 95,
    margin: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  separatorText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = { authRegister, clearRegistMessage};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
