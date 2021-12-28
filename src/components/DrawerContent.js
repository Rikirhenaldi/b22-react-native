/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import ButtonLogout from './ButtonLogout';
import { connect } from 'react-redux';
import { getProfile } from '../redux/actions/profile';
import { authLogOut } from '../redux/actions/auth';


const DrawerContent = ({descriptors, navigation}) => {
  const menuItem = Object.keys(descriptors);
  // const routeName = menuItem.map(item => item.split('-').slice(-1)[0])
  const renderMenu = menuItem.map(item => descriptors[item].options.title);
  // const {data} = profile

  // useEffect(() => {
  //   if (auth.token !== null) {
  //     getProfile(auth.token);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth.token]);

  // const onLogout = () => {
  //   authLogOut();
  //   navigation.closeDrawer();
  // };

  return (
    <View style={DrawerStyles.Parent}>
      <View style={DrawerStyles.User}>
        <TouchableOpacity onPress={() => navigation.navigate('user')}>
            <View style={DrawerStyles.imageWrapper} />
        </TouchableOpacity>
        <Text style={DrawerStyles.UserText} />
        <Text style={DrawerStyles.UserText2}>satoru@gmail.com</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={DrawerStyles.menuItemWrapper}
        data={renderMenu}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(menuItem[index].split('-')[0])}>
            <Text style={DrawerStyles.menuItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => (
          <View style={DrawerStyles.menuSeparator} />
        )}
      />
        <TouchableOpacity style={DrawerStyles.signOut} onPress={() => navigation.navigate('welcome')}>
        <ButtonLogout />
        </TouchableOpacity>
    </View>
  );
};

const DrawerStyles = StyleSheet.create({
  Parent: {
    backgroundColor: 'white',
    flex: 1,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  User: {
    backgroundColor: '#6A4029',
    width: 280,
    height: 288,
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    backgroundColor: 'grey',
    width: 140,
    height: 140,
    borderRadius: 100,
    marginBottom: 20,
  },
  UserText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  UserText2: {
    color: 'white',
    fontSize: 14,
  },
  menuItem: {
    color: '#6A4029',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#6A4029',
    marginVertical: 20,
  },
  menuItemWrapper: {
    margin: 40,
  },
  signOut: {
    marginLeft: 40,
    marginBottom: 20,
  },
});
// const mapStateToProps = state => ({
//   profile: state.profile,
//   auth: state.auth,
// });
// const mapDispatchToProps = {getProfile, authLogOut};
// export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
export default DrawerContent;
