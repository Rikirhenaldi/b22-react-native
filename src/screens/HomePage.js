/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import {SearchBar } from 'react-native-elements';
import {Input, NativeBaseProvider} from 'native-base';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import { getProducts } from '../redux/actions/products';
import { searchProducts } from '../redux/actions/products';
import { getCategories } from '../redux/actions/products';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      category: [{name :'Favorite', id: 5},{name : 'Promo', id: 6}, {name : 'Coffee', id: 1}, {name : 'Non Coffee', id: 2}, {name : 'Food', id: 3}, {name : 'Add-on', id: 4}],
      search: '',
      sort: '',
    };
  }
  componentDidMount(){
    console.log('ini didmount');
    const {token} = this.props.auth;
    if (token === null){
      this.props.navigation.navigate('welcome');
    }
    this.props.getProducts();
    this.props.getCategories();
  }

  onSearch = () => {
    // const {sort, search} = this.state;
    let data = this.state.sort.split(' ');
    console.log(data);
    this.props.searchProducts(this.state.search, data[1], data[0]);
    // return this.props.navigation.reset({index: 0, routes: [{name: 'search'}]});
    return this.props.navigation.navigate('search');
  }
  render() {
    const {data} = this.props.products;
    return (
      <NativeBaseProvider>
      <ScrollView style={styles.parent}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>A good coffee is a good day</Text>
        <View style={styles.inputBoxWraper}>
        <SearchBar
              placeholder="Search"
              onChangeText={value=>this.setState({search:value})}
              onSubmitEditing={this.onSearch}
              value={this.state.search}
              platform="android"
              containerStyle={styles.inputBoxParent}
              inputStyle={styles.inputBox}
            />
            <Picker
              style={styles.BoxPicker}
              selectedValue={this.state.sort}
              onValueChange={(itemValue, itemIndex) =>{
                this.setState({sort: itemValue});}
              }>
              <Picker.Item label="lowest Price" value="asc price" />
              <Picker.Item label="Highest Price" value="desc price" />
              <Picker.Item label="Name A-Z" value="asc name" />
              <Picker.Item label="Name Z-A" value="desc name"/>
            </Picker>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {this.props.products.categories.map((i, idx) => (
          <View style={styles.categoryNav} key={String(idx)} >
            <TouchableOpacity onPress={()=> this.props.navigation.navigate(`${i.category}`, {id: i.id})}>
            <Text style={styles.textNav}>{i.category}</Text>
            </TouchableOpacity>
          </View>
        ))}
        </ScrollView>
        </View>
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.boxWrapper}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('detail', {id: item.id})} style={styles.productCard}>
            <Image style={styles.images}
             source={{uri: item.img_link}}
            />
            <View style={styles.textWrapper}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString('en')}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        />
    </ScrollView>

  </NativeBaseProvider>
    );
  }
}


const styles = StyleSheet.create({
  parent : {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
 productCard: {
  backgroundColor: '#fff',
  height : 180,
  width: 150,
  borderRadius:30,
  elevation: 5,
  margin: 15,
  marginTop: 40,
  justifyContent: 'center',
  alignItems: 'center',
 },
 images: {
   width: 100,
   height: 100,
  //  backgroundColor: 'grey',
   borderRadius: 20,
   marginTop: -40,
   marginBottom: 15,

 },
 textWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
  width: 140,
  height: 80,
  paddingHorizontal: 30,
 },
 productName: {
  fontSize: 16,
  fontWeight: 'bold',
  width: 150,
  textAlign: 'center',
  marginBottom: 10,
 },
 price: {
   color: '#6A4029',
 },
 titleBox: {
    marginLeft: 38,
    marginRight: 38,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
 },
 title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 15,
    width: 310,
    marginTop: 15,
 },
 inputBoxParent: {
  width: 300,
  height: 60,
  backgroundColor: 'white',
  marginBottom: 5,
  borderRadius: 20,
  elevation: 3,
 },
 inputBoxWraper: {
  marginBottom: 20,
 },
 textNav: {
   marginTop: -5,
  marginRight : 10,
  marginLeft: 5,
  marginBottom: 15,
  fontSize: 17,
  color: '#6A4029',
 },
 RadioWraper: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
 },
 BoxPicker: {
   marginLeft: -5,
 },
});

const mapStateToProps = state => ({
  products: state.products,
  auth: state.auth,
});

const mapDispatchToProps = {getProducts, searchProducts, getCategories};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
