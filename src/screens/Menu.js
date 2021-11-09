import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Text, View, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';



export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
        }
    }

    render(){
        const Drawer = createDrawerNavigator();
    
        return(
            <NavigationContainer>
            <Drawer.Navigator initialRouteName="Login">
              <Drawer.Screen name = "screen1" component={Screen1}></Drawer.Screen>
              <Drawer.Screen name = "screen2" component={Screen2}></Drawer.Screen>
              <Drawer.Screen name = "screen3" component={Screen3}></Drawer.Screen>
            </Drawer.Navigator>
          </NavigationContainer>

            )
        }
}
