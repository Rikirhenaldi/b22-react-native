/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';

export default function Profile() {
  return (
    <View style={styles.parent}>
      <Text style={styles.MyProfile}>My Profile</Text>
        <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <Text style={styles.addressDetail}>Your Information</Text>
          <TouchableOpacity>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoUser}>
            <View>
                <View style={styles.imageWrapper}/>
            </View>
            <View style={styles.detailInfo}>
                <Text style={styles.TextName}>Zulaikha</Text>
                <Text style={styles.TextStyle}>zulaikha17@gmail.com</Text>
                <View style={styles.separator} />
                <Text style={styles.TextStyle}>+62 81348287878</Text>
                <View style={styles.separator} />
                <Text style={styles.TextStyle}>Iskandar Street Block A Number 102</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.button}>
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
        <TouchableOpacity style={styles.button}>
            <View style={styles.buttonValue}>
                <Text style={styles.TextName2}>Help</Text>
                <Icon name="ios-chevron-forward-sharp" size={20}/>
            </View>
        </TouchableOpacity>    
        <Button buttonName="Save Change"/>   
        </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
    parent: {
        alignItems: 'center',
        paddingBottom: 40,
        marginTop: 60,
    },
    MyProfile: {
        width: 280,
        height: 60,
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
        marginTop: 20,
      },
      addressDetail: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      infoUser: {
        width: 285,
        height: 197,
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
        alignItems: 'center'
      },
});
