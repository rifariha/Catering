import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Login from './screen/login';
import Register from './screen/register';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const navigator = createStackNavigator(
  {
    Login: Login,
    Register: Register,
  },
  {
    headerMode:'none',
  },
  {
    initialRouteName:'Login',
    defaultNavigationOpions : {
      title: 'App'
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