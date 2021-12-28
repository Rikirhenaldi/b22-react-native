/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FormControl, Input} from 'native-base';
import ButtonGoogle from '../components/ButtonGoogle';
import {connect} from 'react-redux';
import { authLogin } from '../redux/actions/auth';
import ButtonLogin from '../components/ButtonLogin';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Formik } from 'formik';
import * as Yup from 'yup';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state =  {email: '', password: '' };
  }
  onLogin = async (values) =>{
    const {email, password} = values
    await this.props.authLogin(email, password, this.props.navigation).then(()=> {
    if (this.props.auth.sccMsg !== ''){
      showMessage({
        message: 'Login Success',
        type: 'info',
        duration: 1000,
        backgroundColor: "#FFBA33"
      });
    } else {
      hideMessage({
        message: 'Login Success',
        type: 'info',
      });
    }
    }).catch(()=> {
    if (this.props.auth.errMsg !== ''){
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
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Email Must be filled !'),
      password: Yup.string()
        .min(8, 'Min 8 Character!')
        .required('Password Must be filled !'),
    });
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
        <Formik
            validationSchema={validationSchema}
            initialValues={{email: '', password: '', phoneNumber: ''}}
            onSubmit={values => this.onLogin(values)}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
        <FormControl style={styles.inputStyle}>
          <Input
            style={styles.button2}
            w="82%"
            p={3}
            placeholder="Enter your email adress"
            placeholderTextColor="white"
            color="white"
            variant="underlined"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {errors.email ? (
            <Text style={styles.textError}>{errors.email}</Text>
          ) : null}
          <Input
            style={styles.button2}
            w="82%"
            p={3}
            placeholder="Enter your Password"
            placeholderTextColor="white"
            color="white"
            variant="underlined"
            type={false ? 'text' : 'password'}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            keyboardType="ascii-capable"
          />
          {errors.password ? (
            <Text style={styles.textError}>{errors.password}</Text>
          ) : null}
          <TouchableOpacity style={styles.forgotPass}>
            <Text style={styles.button2}>Forgot Password</Text>
          </TouchableOpacity>
          <View style={styles.button2}>
            <ButtonLogin buttonName="Login" action={handleSubmit} />
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
        )}
        </Formik>
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
  textError: {
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 8,
    position: 'relative',
    left: -60,
    width: 200,
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = { authLogin};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
