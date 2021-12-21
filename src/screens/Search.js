/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import React, { Component } from 'react';
import { NativeBaseProvider} from 'native-base';
import { connect } from 'react-redux';
import {SearchBar } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import { searchProducts } from '../redux/actions/products';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      search: '',
      sort: '',
    };
  }
  onSearch = () => {
    // const {sort, search} = this.state;
    let data = this.state.sort.split(' ');
    console.log(data);
    this.props.searchProducts(this.state.search, data[1], data[0]);
    return this.props.navigation.navigate("Searching");
  }
  render() {
    return (
      <NativeBaseProvider>
      <View style={styles.parent}>
      <View style={styles.titleBox}>
          <Text style={styles.title2}>Search Our Products</Text>
        </View>
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
        {this.props.products?.search?.length < 1 ? 
        <View style={styles.notFound}>
          <Text style={styles.title2}>Products Not Found</Text>
        </View> 
        :
        <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.boxWrapper}
        numColumns={2}
        data={this.props.products?.search}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('detail', {id: item.id})} style={styles.productCard}>
          <Image style={styles.images}
             source={{uri: item.img_link}}
            />
          <View style={styles.textWrapper}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.price}>IDR.{item.price}</Text>
          </View>
        </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        />
        }
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
  inputBoxParent: {
    width: 300,
    height: 60,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 20,
    elevation: 3,
   },
   inputBoxWraper: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
   },
   BoxPicker: {
    width: 200,
    // backgroundColor: 'white',
    elevation: 3,
    color: 'black',
    borderRadius: 20,

   },
 productCard: {
  backgroundColor: '#fff',
  height : 190,
  width: 140,
  borderRadius:30,
  elevation: 5,
  margin: 20,
  marginTop: 25,
  justifyContent: 'center',
  alignItems: 'center',
 },
 boxWrapper: {
  paddingBottom: 20,
  width: '100%',
  paddingHorizontal: 20
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
  fontSize: 16,
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
notFound: {
  width: '100%',
  height: 200,
  justifyContent: 'center',
  alignItems: 'center',
}
});

const mapStateToProps = state => ({
  products: state.products,
});
const mapDispatchToProps = {searchProducts}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
