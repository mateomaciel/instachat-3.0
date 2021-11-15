import React, { Component } from 'react'
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export class Buscador extends Component{
    constructor(props){
        super(props);
        this.state = {
            input: ""
        }
    }



    render(){
        <View>
            <TextInput placeholder = 'Buscar publicaciones por usuario' onChange = {texto => this.setState({input: texto})}/>
        </View>
    }
}