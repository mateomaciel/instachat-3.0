import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Menu from './src/screens/menu';

export default function App() {

  const Drawer = createDrawerNavigator();

  return ( 
      <Menu/>
      
      );
}
