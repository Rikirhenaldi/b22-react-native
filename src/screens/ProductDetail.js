/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function ProductDetail() {
  return (
    <View style={styles.parent}>
      <View style={styles.child}>
        <View style={styles.imageWrapper} />
        <Text style={styles.textStyle1}>Cold Brew</Text>
        <Text style={styles.price}>IDR 30.000</Text>
      </View>
      <View>
        <Text style={styles.titleStyle}>Delivery Info</Text>
        <Text style={styles.textStyle3}>
          Delivered only on monday until friday from 1 pm to 7 pm
        </Text>
      </View>
      <View>
        <Text style={styles.titleStyle}>Descriptions</Text>
        <Text style={styles.textStyle3}>
          Cold brewing is a method of brewing that combines ground coffee and
          cool water and uses time instead of heat to extract the flavor. It is
          brewed in small batches and steeped for as long as 48 hours.
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  child: {
    height: 200,
    width: 259,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  imageWrapper: {
    backgroundColor: 'grey',
    width: 170,
    height: 170,
    borderRadius: 100,
    marginBottom: 20,
  },
  textStyle2: {
    textAlign: 'center',
    marginLeft: 38,
    marginRight: 38,
    fontSize: 14,
  },
  textStyle1: {
    textAlign: 'center',
    marginLeft: 38,
    marginRight: 38,
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
  },
  textStyle3: {
    marginLeft: 38,
    marginRight: 38,
    fontSize: 14,
    marginBottom: 20,
    color: 'grey',
    fontWeight: '100',
  },
  titleStyle: {
    marginLeft: 38,
    marginRight: 38,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    marginLeft: 38,
    marginRight: 38,
    width: 300,
    height: 50,
    backgroundColor: '#6A4029',
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  price: {
    color: '#6A4029',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonText: {
    color: 'white',
  },
});
