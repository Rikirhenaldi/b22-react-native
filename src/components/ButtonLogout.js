/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { authLogOut } from '../redux/actions/auth';

const ButtonLogout = ({authLogOut}) => {
  const onLogout = () => {
    authLogOut();
  };
    return (
      <TouchableOpacity onPress={onLogout}>
          <Text style={styles.menuItem}>Log Out</Text>
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
  menuItem: {
    color: '#6A4029',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = {authLogOut};
export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogout);
