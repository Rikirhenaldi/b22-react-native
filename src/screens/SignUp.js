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
import { Formik } from 'formik';
import * as Yup from 'yup';
import { backgroundColor } from 'styled-system';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state =  {email: '', password: '', phoneNumber: ''};
  }
  onRegister = (values) =>{
    const {email, password, phoneNumber} = values;
    this.props.authRegister(email, password, phoneNumber).then(()=> {
      if (this.props.auth.registSccMsg === 'Register Succsessfully'){
        showMessage({
          message: 'Register Success',
          type: 'info',
          duration: 900,
          backgroundColor: "#FFBA33"
        });
        this.props.navigation.navigate('login');
      }
    });
    setTimeout(() => {
      this.props.clearRegistMessage();
    }, 90);
  }
  render() {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is Required !'),
      password: Yup.string()
        .min(8, 'Min 8 Character!')
        .required('password is Required !'),
      phoneNumber: Yup.string()
        .min(11, 'Min 11 Character!')
        .required('Phone Number is Required !'),
    });
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
        <Formik
            validationSchema={validationSchema}
            initialValues={{email: '', password: '', phoneNumber: ''}}
            onSubmit={values => this.onRegister(values)}>
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
          <Input
            style={styles.button2}
            w="82%"
            p={3}
            placeholder="Enter your phone number"
            placeholderTextColor="white"
            color="white"
            variant="underlined"
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
            keyboardType="number-pad"
          />
          {errors.phoneNumber ? (
            <Text style={styles.textError}>{errors.phoneNumber}</Text>
          ) : null}
          <View style={styles.button2}>
            <ButtonLogin buttonName="Create Account" action={handleSubmit}/>
          </View>
          <View style={styles.button2}>
            <ButtonGoogle buttonName= " Create with Google" />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 58,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
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
const mapDispatchToProps = { authRegister, clearRegistMessage};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
