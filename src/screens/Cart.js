/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteProducts } from '../redux/actions/carts';
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import { sumAmount, minAmount } from '../redux/actions/carts';

class Cart extends Component {

    deleteCart = (idx) => {
      this.props.deleteProducts(idx);
    }

    onSumCount = (id, amount) =>{
      const {quantity} = this.props.products.details.item;
      if (amount < quantity){
      this.props.sumAmount(id);
    } else {
      console.log('cant buy more than stock');
    }
    }

    onMinCount = (id, amount) =>{
      if (amount < 1){
        console.log('cant buy less than 0');
      } else {
     this.props.minAmount(id);
     }
    }

  render() {
    const {carts} = this.props;
    console.log('ini data cart',carts?.data);

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
        <View style={styles.scrollWrapper}>
        <View>
            <View style={styles.Swipe}>
              <Icon name="gesture-swipe-left" size={26} />
              <Text style={styles.textSwipe}>Swipe on an item to Delete</Text>
            </View>
            <View style={styles.Cart}>
                <Text style={styles.nameProduct}>My Chart</Text>
          </View>
          </View>
        <SwipeListView
        showsVerticalScrollIndicator={false}
        data={carts?.data}
        renderItem={(data, rowMap) => (
          <View style={styles.productCard}>
              <Image style={styles.productImage}
              source={{uri: data?.item.item?.img_link }}
              />
              <View style={styles.textWraper}>
                {console.log('ini amount', data?.item.order?.amount)}
                  <Text style={styles.nameProduct}>{data?.item.item?.name}</Text>
                  <Text style={styles.priceProduct}>IDR.{data?.item.item?.price.toLocaleString('en')}</Text>
                  <View style={styles.amount}>
                    <Text style={styles.variantProduct}>Regular</Text>
                    <View style={styles.amountButton}>
                      <TouchableOpacity style={styles.SumAndMin} onPress={() => this.onMinCount(data?.item.order?.id, data?.item.order?.amount)} >
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text>{data?.item.order?.amount}</Text>
                      <TouchableOpacity style={styles.SumAndMin} onPress={() => this.onSumCount(data?.item.order?.id, data?.item.order?.amount)} >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
          </View>
        )}
        renderHiddenItem={ (data, rowMap) => (
          <View style={styles.rowBack}>
              <TouchableOpacity style={styles.rowButton}>
                {console.log(data.index)}
                <FaIcon name="heart-o" size={20}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowButton} onPress={() => this.deleteCart(data?.index)}>
                <FaIcon name="trash-o" size={20}/>
              </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-110}
        keyExtractor={(data, rowMap) => String(rowMap)}
        />
        <View>
        <View style={styles.Card2}>
                <View style={styles.deliveIcon}/>
                <Fa5Icon style={styles.Icon} name="shipping-fast" size={30} />
                <View style={styles.textWraper2}>
                    <Text style={styles.total}>Total Price:</Text>
                    <Text style={styles.totalprice}>IDR.120.000</Text>
                </View>
          </View>
          <View style={styles.Card3}>
              <Text style={styles.order}>Complete Order</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('checkout')}>
              <Fa5Icon name="arrow-alt-circle-right" size={40} />
              </TouchableOpacity>
            </View>
          </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
        backgroundColor: '#F2F2F2',
        flex: 1,
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
        width: '100%',
        height: 110,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        padding: 10,
        zIndex: 2,
        backgroundColor: 'white',
      },
      Card2 : {
        width: 300,
        height: 40,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 10,
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
        marginTop: 10,
        marginBottom: 30,
      },
      productImage: {
        width: 90,
        height: 90,
        backgroundColor: 'grey',
        borderRadius: 45,
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
        marginBottom: 30,
    },
    Swipe: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    textSwipe: {
      marginLeft: 5,
    },
    rowBack: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 120,
      flexDirection: 'row',
      zIndex: -1,
    },
    rowButton: {
      width: 45,
      height:45,
      borderRadius: 45,
      backgroundColor: '#FFBA33',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    amount: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 220,
    },
    amountButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: 100,
    },
    SumAndMin: {
      width: 35,
      height: 20,
      borderRadius: 5,
      backgroundColor: '#FFBA33',
      justifyContent: 'center',
      alignItems: 'center',
    },
    picker: {
      width: 100,
      height: 30,
    },
});

const mapStateToProps = state => ({
  carts : state.carts,
  products: state.products,
});
const mapDispatchToProps = {deleteProducts, sumAmount, minAmount};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
