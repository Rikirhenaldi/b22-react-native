/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, { Component } from 'react';
import {Input, NativeBaseProvider} from 'native-base';

export default class Promo extends Component {
  constructor(props) {
    super(props);
    this.state =  {category: [{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000}]};
  }
  render() {
    return (
      <NativeBaseProvider>
      <View style={styles.parent}>
        <View style={styles.titleBox}>
          <Text style={styles.title}> Favorite Products</Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title2}> Stay Hungry!</Text>
          <Text style={styles.title}> Good deals update every wednesday</Text>
        </View>
        <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.boxWrapper}
        numColumns={2}
        data={this.state.category}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('detail')} style={styles.productCard}>
          <View style={styles.images} />
          <View style={styles.textWrapper}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        />
    </View>
    </NativeBaseProvider>
    );
  }
}


const styles = StyleSheet.create({
  parent : {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
 productCard: {
  backgroundColor: '#fff',
  height : 190,
  width: 140,
  borderRadius:30,
  elevation: 5,
  margin: 20,
  marginTop: 60,
  justifyContent: 'center',
  alignItems: 'center',
 },
 boxWrapper: {
  paddingBottom: 20,
},
 images: {
   width: 120,
   height: 120,
   backgroundColor: 'grey',
   borderRadius: 60,
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
    marginTop: 22,
    marginLeft: 35,
    marginRight: 38,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 310,
 },
 title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
 },
 title2: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 8,
},
});
