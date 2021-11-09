import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Screen1 from './src/screens/Screen1';
import Screen2 from './src/screens/Screen2';
import Screen3 from './src/screens/Screen3';


export default function App() {

  const Drawer = createDrawerNavigator();

  return ( 
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name = "screen1" component={Screen1}></Drawer.Screen>
          <Drawer.Screen name = "screen2" component={Screen2}></Drawer.Screen>
          <Drawer.Screen name = "screen3" component={Screen3}></Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}
