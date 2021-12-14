/* eslint-disable prettier/prettier */
import React from 'react';
import { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { getProfile } from '../redux/actions/profile';
import { authLogOut } from '../redux/actions/auth';
import { showMessage, hideMessage } from 'react-native-flash-message';

class Profile extends Component{
  constructor(props) {
    super(props);
    this.state =  {img: null, name: '', email: '', phoneNumber: '', address : '' };
  }
  async componentDidMount(){
    const {token} = this.props.auth;
    await this.props.getProfile(token);
    const {user} = this.props.profile?.data;
    this.setState({email: user[0].email});
    this.setState({name: user[0].name});
    this.setState({img: user[0].img});
    this.setState({phoneNumber: user[0].phoneNumber});
    this.setState({address: user[0].address});
  }
  onLogOut = () => {
    const {token} = this.props.auth;
    this.props.authLogOut();
      if (token === null){
        showMessage({
          message: 'Logout Success',
          type: 'info',
          duration: 1000,
        });
        return this.props.navigation.reset({index: 0, routes: [{name: 'welcome'}]});
      }

  }
  render(){
  return (
    <View style={styles.parent}>
      <Text style={styles.MyProfile}>My Profile</Text>
        <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <Text style={styles.addressDetail}>Your Information</Text>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('editprofilestack')}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoUser}>
            <View>
                <Image style={styles.imageWrapper}
                source={{uri: this.state.img}}
                />
            </View>
            <View style={styles.detailInfo}>
                <Text style={styles.TextName}>{this.state.name}</Text>
                <Text style={styles.TextStyle}>{this.state.email}</Text>
                <View style={styles.separator} />
                <Text style={styles.TextStyle}>{this.state.phoneNumber}</Text>
                <View style={styles.separator} />
                <Text style={styles.TextStyle}>{this.state.address}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('orderhistory')}>
            <View style={styles.buttonValue}>
                <Text style={styles.TextName2}>Order History</Text>
                <Icon name="ios-chevron-forward-sharp" size={20}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <View style={styles.buttonValue}>
                <Text style={styles.TextName2}>Edit Password</Text>
                <Icon name="ios-chevron-forward-sharp" size={20}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <View style={styles.buttonValue}>
                <Text style={styles.TextName2}>FAQ</Text>
                <Icon name="ios-chevron-forward-sharp" size={20}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.onLogOut()}>
            <View style={styles.buttonValue}>
                <Text style={styles.TextName2}>Log Out</Text>
                <Icon name="ios-chevron-forward-sharp" size={20}/>
            </View>
        </TouchableOpacity>
        <Button buttonName="Save Change"/>
        </ScrollView>
    </View>
  );
  }
}
const styles = StyleSheet.create({
    parent: {
        alignItems: 'center',
        marginTop: 10,
    },
    MyProfile: {
        width: 290,
        height: 55,
        fontSize: 34,
        fontWeight: 'bold',
    },
    scrollWrapper: {
        marginBottom: 70,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
        marginBottom: 20,
      },
      addressDetail: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      infoUser: {
        width: 285,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 20,
      },
      imageWrapper: {
        backgroundColor: 'grey',
        width: 90,
        height: 90,
        borderRadius: 60,
        margin: 20,
      },
      detailInfo: {
        width: 140,
        paddingTop: 25,
      },
      TextStyle: {
        fontSize: 13,
        marginBottom: 10,
        color: '#6A4029',
      },
      TextName: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
        fontWeight: 'bold',
      },
      TextName2: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#6A4029',
        marginVertical: 5,
      },
      button: {
        width: 285,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 20,
      },
      buttonValue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
});
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});
const mapDispatchToProps = {getProfile, authLogOut};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
