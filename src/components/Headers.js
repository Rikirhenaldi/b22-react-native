/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function Headers({navigation, scene}) {
  console.log(scene.route.name);
  return (
        <View style={headerStyle.parent}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Icon name="chevron-back" size={25} />
          </TouchableOpacity>
          {scene.route.name === 'detail' ?
          <TouchableOpacity onPress={()=> navigation.navigate('cart')}>
          <AntIcon name="shoppingcart" size={25} />
          </TouchableOpacity>
          : null }
        </View>
  );
}

const headerStyle = StyleSheet.create({
  parent: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
  },
});

