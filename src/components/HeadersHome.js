/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome';

export default function HeadersHome({navigation, scene}) {
  // console.log(scene.route.name);
  return (
        <View >
          {scene.route.name === 'home' ?
          <View style={headerStyle.parent}>
            <TouchableOpacity onPress={()=> navigation.toggleDrawer()}>
            <Icon name="menu" size={25} />
            </TouchableOpacity>
          <View style={headerStyle.leftside}>
            <TouchableOpacity onPress={()=> navigation.navigate('chatlist')}>
              <Icon name="chatbubble-ellipses-outline" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('cart')}>
              <AntIcon name="shoppingcart" size={25} />
            </TouchableOpacity>
          </View>
          </View>
          : null }
        </View>
  );
}

const headerStyle = StyleSheet.create({
  parent: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
  },
  leftside: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 80,
  },
});

