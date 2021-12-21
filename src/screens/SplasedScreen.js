import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class SplasedScreen extends Component {
  componentDidMount() {
    const {token} = this.props.auth;
    setTimeout(() => {
      if (typeof token === 'string') {
        console.log(typeof token === 'string');
        this.props.navigation.reset({index: 0, routes: [{name: 'home'}]});
      } else {
        this.props.navigation.reset({index: 0, routes: [{name: 'welcome'}]});
      }
    }, 2000);
  }
  render() {
    return (
      <View style={styles.parent}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text style={styles.title}> Coffee Shop </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    color: '#6A4029',
    fontWeight: 'bold',
    marginTop: -40,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SplasedScreen);
