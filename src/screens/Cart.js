/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state =  {product: ['hazelnut','Pinky Promise', 'MatchaLatte']};
      }
  render() {
    return (
      <View style={styles.parent}>
          <View style={styles.stepPayment}>
              <TouchableOpacity  style={styles.dot}>
              <Fa5Icon name="dot-circle" size={35} color={'#6A4029'} />
              <Text>  Order  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('checkout') } style={styles.dot}>
              <Fa5Icon name="dot-circle" size={35} color={'#9F9F9F'} />
              <Text>Checkout</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('payment')} style={styles.dot}>
              <Fa5Icon name="dot-circle" size={35} color={'#9F9F9F'} />
              <Text> Payment</Text>
              </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
        <View>
        <View style={styles.Cart}>
            <Text style={styles.nameProduct}>My Chart</Text>
        </View>
        {this.state.product.map((i, idx) => (
          <View style={styles.productCard} key={String(idx)} >
                <View style={styles.productImage}/>
                <View style={styles.textWraper}>
                    <Text style={styles.nameProduct}>{i}</Text>
                    <Text style={styles.priceProduct}>IDR.25.000</Text>
                    <Text style={styles.variantProduct}>Regular</Text>
                </View>
          </View>
        ))}
        </View>
        <View style={styles.Card2}>
                <View style={styles.deliveIcon}/>
                <Fa5Icon style={styles.Icon} name="shipping-fast" size={30} />
                <View style={styles.textWraper2}>
                    <Text style={styles.total}>Total Price:</Text>
                    <Text style={styles.totalprice}>IDR.25.000</Text>
                </View>
          </View>
          <View style={styles.Card3}>
              <Text style={styles.order}>Complete Order</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('checkout') }>
              <Fa5Icon name="arrow-alt-circle-right" size={40} />
              </TouchableOpacity>
          </View>
          </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
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
      productCard : {
        width: 300,
        height: 90,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      Card2 : {
        width: 300,
        height: 50,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
      },
      Card3 : {
        width: 300,
        height: 50,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 30,
        marginTop: 30,
        marginBottom: 30,
      },
      productImage: {
        width: 90,
        height: 90,
        backgroundColor: 'grey',
        borderRadius: 25,
      },
      deliveIcon: {
        width: 70,
        height: 50,
        backgroundColor: '#E0E0E2',
        borderRadius: 10,
      },
      textWraper: {
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        height: 90,
        width: 160,
        paddingTop: 10,
        marginLeft: 10,
      },
      textWraper2: {
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        height: 70,
        width: 160,
        paddingTop: 10,
        marginLeft: 30,
        borderBottomWidth: 1,
        borderColor: '#9F9F9F',
      },
      nameProduct: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      priceProduct: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6A4029',
      },
      variantProduct: {

      },
      Cart: {
        marginBottom: 20,
      },
      total: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#9F9F9F',
      },
      totalprice: {
        fontSize: 15,
        fontWeight: 'bold',
      },
      Icon: {
          marginLeft: -50,
      },
      order: {
        fontSize : 20,
        marginRight: 20,
      },
      scrollWrapper: {
        marginBottom: 50,
    },
});
