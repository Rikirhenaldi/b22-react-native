/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getDetailHistory} from '../redux/actions/history';

class SearchUsers extends Component {

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.Cart}>
          <Text style={styles.History}>Search Results</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.boxWrapper}
          // ListHeaderComponent={}
          data={this.props.chats?.search}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.productCard}
            onPress={() =>
              this.props.navigation.navigate('chatroom', {
                phoneNumber: item.phoneNumber,
                img: item.img,
                name: item.name,
              })
            } >
              <Image style={styles.userImages} source={{uri: item.img}} />
              <View style={styles.textWrapper}>
                <Text style={styles.name}>
                  Name : {item.name}
                </Text>
                <Text style={styles.name}>
                  No.Hp : {item.phoneNumber}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  productCard: {
    width: '90%',
    backgroundColor: 'white',
    height: 100,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  History: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 60,
    marginHorizontal: 20,
  },
  Cart: {
    marginBottom: 20,
  },
  userImages: {
    width: 90,
    height: 90,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  textWrapper: {
    marginHorizontal: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
  chats: state.chats,
});

const mapDispatchToProps = {getDetailHistory};
export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);
