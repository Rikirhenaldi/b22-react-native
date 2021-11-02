/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import { getDetails } from '../redux/actions/products';
import { addProducts } from '../redux/actions/carts';

class ProductDetail extends Component{
  componentDidMount(){
    console.log(this.props.route.params.id);
    this.getData();
  }

  getData = () => {
    this.props.getDetails(this.props.route.params.id);
  }
  addProductsToCart = () => {
    const {item} = this.props.products?.details;
    this.props.addProducts(item, 1, this.props.route.params.id)
    this.props.navigation.navigate('cart')
  }
  render(){
    const {item} = this.props.products?.details;
  return (
    <View style={styles.parent}>
      <View style={styles.child}>
        <Image style={styles.imageWrapper}
          source={{uri: item?.img_link}}
        />
        <Text style={styles.textStyle1}>{item?.name}</Text>
        <Text style={styles.price}>IDR {item?.price}</Text>
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
          {item?.description}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={this.addProductsToCart}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}
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
    width: 300,
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
const mapStateToProps = state => ({
  products : state.products,
});
const mapDispatchToProps = {getDetails, addProducts};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
