import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomePage from './src/screens/HomePage';
import ProductDetail from './src/screens/ProductDetail';
import Cart from './src/screens/Cart';
import Headers from './src/components/Headers';
import History from './src/screens/History';
import Payment from './src/screens/Payment';
import {NativeBaseProvider} from 'native-base';
import Checkout from './src/screens/Checkout';
import EditProfile from './src/screens/EditProfile';
import AllMenu from './src/screens/AllMenu';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import Security from './src/screens/Security';
import DrawerContent from './src/components/DrawerContent';
import Profile from './src/screens/Profile';
import Favorite from './src/screens/Favorite';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class MainStack extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            component={HomePage}
            name="home"
            options={{title: 'Dasboard'}}
          />
          <Stack.Screen
            component={ProductDetail}
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="detail"
          />
          <Stack.Screen
            component={Cart}
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="cart"
          />
          <Stack.Screen
            component={Checkout}
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="checkout"
          />
          <Stack.Screen
            component={Payment}
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="payment"
          />
          <Stack.Screen
            component={History}
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="history"
          />
          <Stack.Screen
            component={Profile}
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="profile"
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="favorite"
            component={Favorite}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    );
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: 'transparent',
        }}
        drawerContent={DrawerContent}>
        <Drawer.Screen
          options={{
            header: Headers,
            cardStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            title: 'Main',
          }}
          name="root"
          component={MainStack}
        />
        <Drawer.Screen
          options={{
            header: Headers,
            cardStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            title: 'Edit Profile',
          }}
          name="editProfile"
          component={EditProfile}
        />
        <Drawer.Screen
          options={{
            header: Headers,
            cardStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            title: 'Orders',
          }}
          name="order"
          component={Cart}
        />
        <Drawer.Screen
          options={{title: 'All Menu'}}
          name="allMenu"
          component={AllMenu}
        />
        <Drawer.Screen
          options={{title: 'Privacy Policy'}}
          name="privacyPolicy"
          component={PrivacyPolicy}
        />
        <Drawer.Screen
          options={{title: 'Security'}}
          name="security"
          component={Security}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
