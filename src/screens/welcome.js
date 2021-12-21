/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import ButtonYellow from '../components/ButtonYellow';
import {connect} from 'react-redux';

class Welcome extends Component {

  async componentDidMount () {
    const {token} = this.props.auth;
    if (typeof token === 'string'){
      console.log(typeof token === 'string');
      this.props.navigation.navigate('home');
    } else {
      console.log(typeof token === 'string');
    }
  }
  render() {
    return (
      <View style={styles.parent}>
        <Image style={styles.banner} source={require('../assets/banner.png')} />
        <View style={styles.child}/>
        <View style={styles.title}>
            <Text style={styles.titleText}>Coffee for Everyone</Text>
            <View style={styles.button} >
                <ButtonYellow buttonName="Get Started" routeName="signorlogin" />
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
    marginTop: 160,

  },
  titleText: {
      fontSize: 58,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  button: {
      position: 'absolute',
      marginTop: 360,
  },
});
const mapStateToProps = state => ({
    auth: state.auth,
  });
export default connect(mapStateToProps, null)(Welcome);
