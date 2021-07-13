/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import {Input, NativeBaseProvider} from 'native-base';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state =  {category: ['Favorit', 'Promo','Coffee', 'Non Coffee', 'Food', 'Add-on']};
  }
  render() {
    return (
      <NativeBaseProvider>
      <View style={styles.parent}>
        <View style={styles.titleBox}>
          <Text style={styles.title}> A good coffee is a good day</Text>
        <Input
        style={styles.inputBox}
        variant= "rounded"
        size="xs"
        placeholder="Search"
        _light={{
          placeholderTextColor: 'blueGray.400',
        }}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {this.state.category.map((i, idx) => (
          <View style={styles.categoryNav} key={String(idx)} >
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('favorite')}>
            <Text style={styles.textNav}>{i}</Text>
            </TouchableOpacity>
          </View>
        ))}
        </ScrollView>
        </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[...Array(20)].map((_i, idx) => (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('detail')} style={styles.productCard} key={String(idx)}>
            <View style={styles.images} />
            <View style={styles.textWrapper}>
            <Text style={styles.productName}>HazelNut Latte</Text>
            <Text style={styles.price}>IDR 25.000</Text>
            </View>
          </TouchableOpacity>
    ))}
      </ScrollView>
    </View>

    </NativeBaseProvider>
    );
  }
}


const styles = StyleSheet.create({
  parent : {
    backgroundColor: '#F2F2F2',
  },
 productCard: {
  backgroundColor: '#fff',
  height : 220,
  width: 180,
  borderRadius:30,
  elevation: 5,
  margin: 38,
  marginTop: 60,
  justifyContent: 'center',
  alignItems: 'center',
 },
 images: {
   width: 138,
   height: 149,
   backgroundColor: 'grey',
   borderRadius: 20,
   marginTop: -40,
   marginBottom: 15,

 },
 textWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
 },
 productName: {
  fontSize: 20,
  fontWeight: 'bold',
  width: 100,
  textAlign: 'center',
  marginBottom: 10,
 },
 price: {
   color: '#6A4029',
 },
 titleBox: {
    marginTop: 30,
    marginLeft: 38,
    marginRight: 38,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
 },
 title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 190,
 },
 inputBox: {
  width: 268,
  height: 40,
  backgroundColor: '#EFEEEE',
  marginBottom: 15,
 },
 categoryNav: {

 },
 textNav: {
  margin : 10,
  fontSize: 17,
  color: '#6A4029',
 },
});
