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
import { getHistory } from '../redux/actions/history';
import { STATEMENT_TYPES } from '@babel/types';

class OrderHistory extends Component {

    deleteCart = (idx) => {
      this.props.deleteProducts(idx);
    }
    componentDidMount(){
      const {token} = this.props.auth;
      this.props.getHistory(token)
    }

  render() {
    return (
        <View style={styles.scrollWrapper}>
        <View>
            <View style={styles.Cart}>
                <Text style={styles.Order}>Order History</Text>
          </View>
          <View style={styles.Swipe}>
              <Icon name="gesture-swipe-left" size={26} />
              <Text style={styles.textSwipe}>Swipe on an item to Delete</Text>
            </View>
          </View>
        <SwipeListView
        showsVerticalScrollIndicator={false}
        data={this.props.history?.listhistory}
        renderItem={(data, rowMap) => (
          <View style={styles.productCard}>
              <Image style={styles.productImage}
              source={{uri: data?.item.item?.img_link }}
              />
              <View style={styles.textWraper}>
                  <Text style={styles.nameProduct}>{data?.item.code}</Text>
                  <Text style={styles.priceProduct}>IDR.{data?.item.total}</Text>
                  <View style={styles.amount}>
                    <Text style={styles.variantProduct}>{data?.item.payment_method}</Text>
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
    Order: {
      fontSize: 34,
      fontWeight: 'bold',
      marginTop: 60,
      marginHorizontal: 20,
    },
    stepPayment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 110,
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
  auth : state.auth,
  products: state.products,
  history: state.history,
});
const mapDispatchToProps = {deleteProducts, getHistory};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
