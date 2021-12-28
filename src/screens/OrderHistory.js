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
import { deleteHistory } from '../redux/actions/history';
import { STATEMENT_TYPES } from '@babel/types';
import AwesomeAlert from 'react-native-awesome-alerts';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };

    showAlert = () => {
      this.setState({
        showAlert: true,
      });
    };

    hideAlert = () => {
      this.setState({
        showAlert: false,
      });
    };
    
    deleteCartHistory = (idpayment, idx) => {
      const {token} = this.props.auth;
      this.props.deleteHistory(idpayment, token);
      this.props.getHistory(token);
    }
    componentDidMount(){
      const {token} = this.props.auth;
      this.props.getHistory(token);
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
              <Text style={styles.textSwipe}>Swipe on an item to see Detail or Delete</Text>
            </View>
          </View>
        <SwipeListView
        showsVerticalScrollIndicator={false}
        data={this.props.history?.listhistory}
        renderItem={(data, rowMap) => (
          <View style={styles.productCard}>
              <View style={styles.productImage}>
                <FaIcon name="shopping-bag" size={40} />
              </View>
              <View style={styles.textWraper}>
                  <Text style={styles.nameProduct}>{data?.item.code}</Text>
                  <Text style={styles.priceProduct}>IDR.{data?.item.total.toLocaleString("en")}</Text>
                  <View style={styles.amount}>
                    <Text style={styles.variantProduct}>{data?.item.payment_method}</Text>
                  </View>
              </View>
          </View>
        )}
        inverted
        renderHiddenItem={ (data, rowMap) => (
          <View style={styles.rowBack}>
              <TouchableOpacity style={styles.rowButton} onPress={() => this.props.navigation.navigate('detailhistory', {id: data?.item.id_payment})}>
                {console.log('ini id',data)}
                <FaIcon name="list" size={20}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowButton} onPress={() => this.showAlert()}>
                <FaIcon name="trash-o" size={20}/>
              </TouchableOpacity>
              <AwesomeAlert
            show={this.state.showAlert}
            titleStyle={styles.title}
            messageStyle={styles.message}
            showProgress={false}
            title="Warning"
            message="Are you sure you want to delete this history payment ?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, delete it"
            confirmButtonColor="#FFBA33"
            cancelButtonStyle={styles.cancel}
            confirmButtonStyle={styles.confirm}
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.deleteCartHistory(data?.item.id_payment, data?.index)
            }}
          />
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
        backgroundColor: '#FFBA33',
        borderRadius: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    message: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancel: {
      marginRight: 60,
    },
});

const mapStateToProps = state => ({
  auth : state.auth,
  products: state.products,
  history: state.history,
});
const mapDispatchToProps = {deleteProducts, getHistory, deleteHistory};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
