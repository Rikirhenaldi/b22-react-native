/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import DebitComponent from '../components/DebitComponent';

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state =  {product: ['hazelnut','Pinky Promise', 'MatchaLatte','Pinky Promise', 'MatchaLatte', 'MatchaLatte','Pinky Promise', 'MatchaLatte']};
  }
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.stepPayment}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('cart') }  style={styles.dot}>
              <Fa5Icon name="dot-circle" size={35} color={'#9F9F9F'} />
              <Text>  Order  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dot} onPress={()=> this.props.navigation.navigate('checkout')} style={styles.dot}>
              <Fa5Icon name="dot-circle" size={35} color={'#9F9F9F'} />
              <Text>Checkout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dot}>
              <Fa5Icon name="dot-circle" size={35} color={'#6A4029'} />
              <Text> Payment</Text>
              </TouchableOpacity>
        </View>
        <View style={styles.child}>
          <Text style={styles.title}> Payment Methods </Text>
          <View style={styles.separator} />
        </View>
          <FlatList
          showsVerticalScrollIndicator={false}
            style={styles.boxWrapper}
            data={this.state.product}
            ListHeaderComponent={DebitComponent}
            renderItem={({item}) => (
              <View style={styles.menuItemWrapper}>
                <View>
                  <Text style={styles.productName}>{item}</Text>
                  <Text style={styles.variantName}>Regular</Text>
                </View>
                <View>
                  <Text style={styles.productName}>IDR. 50.000</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => String(index)}
            ListFooterComponent={() => (
              <View style={styles.topSeparator}>
                <View >
                  <View style={styles.total}>
                    <Text style={styles.subTotalText}>subtotal</Text>
                    <View>
                      <Text style={styles.subTotalText}>IDR 50.000</Text>
                    </View>
                  </View>
                  <View style={styles.total}>
                    <Text style={styles.subTotalText}>Tax</Text>
                    <View>
                      <Text style={styles.subTotalText}>IDR 16.000</Text>
                    </View>
                  </View>
                  <View style={styles.total}>
                    <Text style={styles.totalText}>Total</Text>
                      <View>
                        <Text style={styles.totalText}>IDR 50.000</Text>
                      </View>
                  </View>
                  </View>
                  <View style={styles.Button}>
                  <Button buttonName="Pay Now"/>
                  </View>
              </View>
            )}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    width: 200,
    marginBottom:20,
  },
  dot : {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8,
  },
  child: {
    marginTop: 10,
    justifyContent: 'center',
    paddingBottom: 20,
    width: 310,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: '#6A4029',
    
  },
  topSeparator: {
    borderTopWidth: 2,
    marginVertical: 10,
    width: 310,
    marginLeft: 10,
  },
  menuItemWrapper: {
    width: 310,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  variantName: {
    marginBottom: 6,
  },
  boxWrapper: {
    marginTop: 20,
    height: 200,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginLeft: 5,
    marginTop: 25,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTotalText: {
    fontSize: 14,
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});
