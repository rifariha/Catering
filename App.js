import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Login from './screen/login';
import Register from './screen/register';
import Menu from './screen/menu';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const navigator = createStackNavigator(
  {
    Login: Login,
    Register: Register, 
    Menu: Menu,
  },
  {
    headerMode:'none',
    initialRouteName:'Menu',
    defaultNavigationOpions : {
      title: ''
    } 
  }
);  

export default createAppContainer(navigator)
// class App extends Component {
//   render() {
//     return (
//       <ScrollView>
//         <View> 
//           <Login></Login>
//         </View>
//       </ScrollView>
//     ); 
//   }
// }

// export default App; 