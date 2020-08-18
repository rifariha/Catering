import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import LoginScreen from './screen/login';
import RegisterScreen from './screen/register';
import MenuScreen from './screen/menu';
import MenuDetailScreen from './screen/menudetail';
import CartScreen from './screen/cart';
import AccountScreen from './screen/account';
import OrderScreen from './screen/order';
import Icon from 'react-native-vector-icons/Feather'

import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as AuthProvider } from './screen/context/AuthContext'
import { setNavigator } from './screen/navigationRef'
import ResolveAuthScreen from './screen/ResolveAuthScreen'

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginflow: createStackNavigator({
    Signin: LoginScreen,
    Signup: RegisterScreen,
  }),
  mainFLow: createBottomTabNavigator({
    Menu : {
      screen: createStackNavigator({
        DaftarMenu: MenuScreen,
        DetailMenu: MenuDetailScreen,
      }),
      navigationOptions: {
        tabBarLabel: 'Menu',
        tabBarIcon: () => (
            <Icon name="book-open" size={20} />
        )
      },
    },
    Order: {
      screen: createStackNavigator({
        Keranjang : CartScreen,
      }),
      navigationOptions: {
        tabBarLabel: 'Pesanan',
        tabBarIcon: () => (
            <Icon name="shopping-cart" size={20} />
        ),
      },
    },
    History : {
      screen: createStackNavigator({
        Order : OrderScreen,
      }),
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: () => (
            <Icon name="clock" size={20}/>
        )
      },
    },
    Account : {
      screen: createStackNavigator({
        Account : AccountScreen,
      }),
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: () => (
            <Icon name="user" size={20} />
        )
      },
    },
  })

});

// const navigator = createStackNavigator(
//   {
//     Login: Login,
//     Register: Register, 
//     Menu: Menu,
//   },
//   {
//     headerMode:'none',
//     initialRouteName:'Login',
//     defaultNavigationOpions : {
//       title: ''
//     } 
//   }
// );  

const App =  createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => {setNavigator(navigator)}}/>
    </AuthProvider>
  )
}