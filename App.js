import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import LoginScreen from './screen/login';
import RegisterScreen from './screen/register';
import MenuScreen from './screen/menu';
import MenuDetailScreen from './screen/menudetail';
import AccountScreen from './screen/account';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as AuthProvider } from './screen/context/AuthContext'
import { setNavigator } from './screen/navigationRef'

const switchNavigator = createSwitchNavigator({
  loginflow: createStackNavigator({
    Signin: LoginScreen,
    Signup: RegisterScreen,
  }),
  mainFLow: createBottomTabNavigator({
    ListMenu: createStackNavigator({
      Menu: MenuScreen,
      DetailMenu: MenuDetailScreen,
    }),
    Account: AccountScreen,
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