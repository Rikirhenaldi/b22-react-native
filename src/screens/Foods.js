/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import React, { Component } from 'react';
import { NativeBaseProvider} from 'native-base';
import { getProductByCategories } from '../redux/actions/products';
import { connect } from 'react-redux';

class Foods extends Component {
  constructor(props) {
    super(props);
    this.state =  {category: [{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000},{name: 'coffe Latte', price: 20000}]};
  }
  componentDidMount(){
    console.log(this.props.route.params.id);
    this.props.getProductByCategories(this.props.route.params.id);
  }
  render() {
    return (
      <NativeBaseProvider>
      <View style={styles.parent}>
        <View style={styles.titleBox}>
          <Text style={styles.title}> Foods </Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title2}> Special Tasted Foods</Text>
        </View>
        <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.boxWrapper}
        numColumns={2}
        data={this.props.products.productByCategory}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('detail', {id: item.id})} style={styles.productCard}>
          <Image style={styles.images}
             source={{uri: item.img_link}}
            />
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
  height : 200,
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
const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = {getProductByCategories};

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
