import React, {Component} from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/HomePage';
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
import Promo from './src/screens/Promo';
import Welcome from './src/screens/Welcome';
import SignOrLogin from './src/screens/SignOrLogin';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import FlashMessage from 'react-native-flash-message';
import Search from './src/screens/Search';
import HeadersHome from './src/components/HeadersHome';
import ChatList from './src/screens/ChatList';
import ChatRoom from './src/screens/ChatRoom';
import OrderHistory from './src/screens/OrderHistory';
import Coffee from './src/screens/Coffee';
import DetailHistory from './src/screens/DetailHistory';

import FAIcons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NonCoffee from './src/screens/NonCoffee';
import Foods from './src/screens/Foods';
import Addon from './src/screens/Addon';
import {postPayment} from './src/redux/actions/payment';
import SearchUsers from './src/screens/SearchUsers';
import SplasedScreen from './src/screens/SplasedScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#6A4029',
        inactiveTintColor: 'grey',
        labelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
        },
        tabBarStyle: {height: 70, paddingBottom: 8},
      }}>
      <Tab.Screen
        name="Homescreen"
        component={Home}
        options={{
          title: null,
          cardStyle: {backgroundColor: 'transparent'},
          headerTransparent: true,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Searching"
        component={Search}
        options={{
          title: null,
          cardStyle: {backgroundColor: 'transparent'},
          headerTransparent: true,
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="user"
        component={Profile}
        options={{
          title: null,
          cardStyle: {backgroundColor: 'transparent'},
          headerTransparent: true,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FAIcons name="user-circle-o" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

class MainStack extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="splasedscreen">
          <Stack.Screen
            component={BottomTab}
            name="home"
            options={{
              header: HeadersHome,
              // cardStyle: {backgroundColor: 'transparent'},
              // headerTransparent: true,
            }}
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
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="profile"
            component={Profile}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="Favorite"
            component={Favorite}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="Coffee"
            component={Coffee}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="Non Coffee"
            component={NonCoffee}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="Foods"
            component={Foods}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="Adds-on"
            component={Addon}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="orderhistory"
            component={OrderHistory}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="detailhistory"
            component={DetailHistory}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="search"
            component={Search}
          />

          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="searchusers"
            component={SearchUsers}
          />

          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="Promo"
            component={Promo}
          />
          <Stack.Screen
            options={{
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
              headerShown: false,
            }}
            name="welcome"
            component={Welcome}
          />
          <Stack.Screen
            options={{
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
              headerShown: false,
            }}
            name="splasedscreen"
            component={SplasedScreen}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="signorlogin"
            component={SignOrLogin}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="chatlist"
            component={ChatList}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="chatroom"
            component={ChatRoom}
          />
          <Stack.Screen
            options={{
              header: Headers,
              cardStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
            }}
            name="signup"
            component={SignUp}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NativeBaseProvider>
    );
  }
}

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: Headers,
          cardStyle: {backgroundColor: 'transparent'},
          headerTransparent: true,
        }}
        name="order"
        component={Cart}
      />
    </Stack.Navigator>
  );
};

const AllMenuStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: Headers,
          cardStyle: {backgroundColor: 'transparent'},
          headerTransparent: true,
        }}
        name="AllMenu"
        component={AllMenu}
      />
    </Stack.Navigator>
  );
};

const EditProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: Headers,
          cardStyle: {backgroundColor: 'transparent'},
          headerTransparent: true,
        }}
        name="editProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

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
          name="editprofilestack"
          component={EditProfileStack}
        />
        <Drawer.Screen
          options={{
            title: 'Orders',
          }}
          name="orderstack"
          component={OrderStack}
        />
        <Drawer.Screen
          options={{
            header: Headers,
            cardStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            title: 'All Menu',
          }}
          name="allMenuStack"
          component={AllMenuStack}
        />
        <Drawer.Screen
          options={{title: 'Privacy Policy'}}
          name="privacyPolicy"
          component={PrivacyPolicy}
        />
        <Drawer.Screen
          options={{title: 'Security'}}
          name="welcome"
          component={Welcome}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
