/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FormControl, Input} from 'native-base';
import ButtonGoogle from '../components/ButtonGoogle';
import {connect} from 'react-redux';
import { authLogin } from '../redux/actions/auth';
import ButtonLogin from '../components/ButtonLogin';
import { showMessage, hideMessage } from 'react-native-flash-message';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state =  {email: '', password: '' };
  }
  onLogin = async (e) =>{
    await e.preventDefault();
    const {email, password} = this.state;
    await this.props.authLogin(email, password, this.props.navigation).then(()=> {
    const msg = this.props.auth.sccMsg;
    console.log(msg);
    if (msg !== ''){
      showMessage({
        message: 'Login Success',
        type: 'info',
      });
    } else {
      hideMessage({
        message: 'Login Success',
        type: 'info',
      });
    }
    }).catch(()=> {
    const msg2 = this.props.auth.errMsg;
    if (msg2 !== ''){
      showMessage({
        message: 'Wrong Email or Password',
        type: 'info',
      });
    } else {
      hideMessage({
        message: 'Wrong Email or Password',
        type: 'info',
      });
    }
    })
  }
  render() {
    const {sccMsg} = this.props.auth;
    return (
      <View style={styles.parent}>
        <Image
          style={styles.banner}
          source={require('../assets/bannerLogin.png')}
        />
        <View style={styles.child} />
        <View style={styles.title}>
          <Text style={styles.titleText}>Login</Text>
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
            onChangeText={value=>this.setState({email:value})}
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
            onChangeText={value=>this.setState({password:value})}
          />
          <TouchableOpacity style={styles.forgotPass}>
            <Text style={styles.button2}>Forgot Password</Text>
          </TouchableOpacity>
          <View style={styles.button2}>
            <ButtonLogin buttonName="Login" action={this.onLogin} />
          </View>
          <View style={styles.orLogin}>
            <View style={styles.separator}/>
            <Text style={styles.separatorText}>or Login With</Text>
            <View style={styles.separator}/>
          </View>
          <View style={styles.button2}>
            <ButtonGoogle buttonName= " Login with Google" />
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
    justifyContent: 'flex-start',
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
const mapDispatchToProps = { authLogin};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
