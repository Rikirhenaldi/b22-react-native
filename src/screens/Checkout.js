/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import { Radio, NativeBaseProvider } from 'native-base';
import { connect } from 'react-redux';
import { getProfile } from '../redux/actions/profile';
import ButtonAction from '../components/ButtonAction';
import { showMessage, hideMessage } from 'react-native-flash-message';

class  Checkout extends Component{
  constructor(props) {
    super(props);
    this.state =  {img: null, name: '', email: '', phoneNumber: '', address : '' };
  }
  async componentDidMount(){
    const {token} = this.props.auth;
    await this.props.getProfile(token);
    // await this.props.getHistoryProducts(token);
    const {user} = this.props.profile?.data;
    this.setState({email: user.email});
    this.setState({name: user.name});
    this.setState({img: user.img});
    this.setState({phoneNumber: user.phoneNumber});
    this.setState({address: user.address});
    console.log('ini email setstate', this.state);
  }
  onPayment = () => {
    const {user} = this.props.profile?.data;
    console.log(user.address);
    if (user.address !== null){
      this.props.navigation.navigate('payment');
    } else {
      showMessage({
        message: 'Must add your address to complete Payment',
        type: 'default',
        backgroundColor: 'red',
        color: 'white',
      });
    }
  }
    render(){
    return (
      <NativeBaseProvider>
      <View style={styles.parent}>
          <View style={styles.stepPayment}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('cart') }  style={styles.dot}>
              <Fa5Icon name="dot-circle" size={35} color={'#9F9F9F'} />
              <Text>  Order  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dot}>
              <Fa5Icon name="dot-circle" size={35} color={'#6A4029'} />
              <Text>Checkout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dot} onPress={()=> this.props.navigation.navigate('payment')}>
              <Fa5Icon name="dot-circle" size={35} color={'#9F9F9F'} />
              <Text> Payment</Text>
              </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
        <View style={styles.delive}>
            <Text style={styles.deliveTitle}>Delivery</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.addressDetail}>Address details</Text>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('user')}>
            <Text>change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.address}>
          <View>
          <TextInput style={styles.BoxTextArea}
             placeholder={this.state.address}
             underlineColorAndroid="transparent"
             multiline = {true}
            numberOfLines = {3}
             editable={false}
             selectTextOnFocus={false}/>
          </View>
          <View>
          <TextInput style={styles.BoxText}
             placeholder="+62 81348287878"
             underlineColorAndroid="transparent"
             multiline={true}
             editable={false}
             selectTextOnFocus={false}/>
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.textAddress}>Delivery Methods</Text>
        </View>
        <View style={styles.address2}>
          <Radio.Group
              defaultValue="1"
              name="myRadioGroup"
              accessibilityLabel="Pick your delivery"
            >
              <Radio accessibilityLabel="Door delivery" name="Door delivery" value="1" my={1}>
              <Text style={styles.BoxText2}>Door delivery</Text>
              </Radio>
              <Radio accessibilityLabel="pick up"  name="Pick up at store" value="2" my={1}>
              <Text style={styles.BoxText2}>Pick up at store</Text>
              </Radio>
              <Radio accessibilityLabel="dine in"  name="Dine in" value="3" my={1}>
              <Text style={styles.BoxText2}>Dine in</Text>
              </Radio>
            </Radio.Group>
        </View>
        <View style={styles.title}>
          <Text >Total</Text>
          <TouchableOpacity>
            <Text style={styles.addressDetail}>IDR 50.000</Text>
          </TouchableOpacity>
        </View>
          <ButtonAction buttonName="Proceed to payment" action={this.onPayment} />
        </View>
        </ScrollView>
      </View>
      </NativeBaseProvider>
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
    title: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 280,
      marginBottom: 20,
      marginTop: 20,
    },
    delive: {
      marginBottom: 20,

    },
    deliveTitle: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    address: {
      flex: 1,
      width: 280,
      elevation: 3,
      backgroundColor: 'white',
      padding: 8,
      borderRadius: 10,
      paddingBottom: 20,

    },
    address2: {
      height: 150,
      width: 280,
      elevation: 3,
      backgroundColor: 'white',
      padding: 8,
      borderRadius: 10,
    },
    textAddress: {
      fontWeight: 'bold',

    },
    BoxText: {
      justifyContent: 'center',
      height: 40,
      borderBottomWidth: 1,
    },
    BoxTextArea: {
      justifyContent: 'center',
      height: 60,
      borderBottomWidth: 1,
    },
    BoxText2: {
      justifyContent: 'center',
      height: 25,
      marginLeft: 20,
      width: 220,
      borderBottomWidth: 1,
      fontSize: 16,
    },
    addressDetail: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    container: {
      paddingBottom: 50,
    },
});
const mapStateToProps = state => ({
  profile : state.profile,
  auth: state.auth,
});
const mapDispatchToProps = {getProfile};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
