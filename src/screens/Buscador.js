import React, { Component }  from "react";
import {View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, TouchableOpacity, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post'

export default class Buscador extends Component{

    constructor (props){
        super(props);
        this.state = {
            input: "",
            result: [],
            loader: false
        }
    }

    Buscar(text){
        
        this.setState({input: text,
                    loader: true,
                    })
                
        
        setTimeout(() => {
            db.collection('posts').where('owner', '==', `${this.state.input.toLowerCase()}`).orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let postsAux = []
                docs.forEach( doc => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    result: postsAux,
                })
                this.setState({
                        loader: false
                    })
                console.log(this.state.input)
                console.log(this.state.result)
                console.log(this.state.loader)

            }
        )}, 2500);
        
    }
    
    

    render(){
        
        if(this.state.input === "" && this.state.loader === false){
            return(

                <View style = {styles.Container}>
                <View style = {styles.Header}>
                <Image style={styles.Logo} source={require('../../assets/InstachatLogo.jpg')}resizeMode='cover'/>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
                </View>
                    <View style = {styles.BuscadorContainer}>
                        <TextInput style = {styles.BuscadorInput} placeholder = "Buscar usuarios" onChangeText = {text => {this.Buscar(text)}}/>
                    </View>
                    <View>
                    <Image style={styles.NoLoadImg} source={require('../../assets/ProfileIcon.jpg')}resizeMode='cover'/>
                    <Text style={styles.NoResult}>Coming soon: historial de busqueda :D (Mentira)</Text>
                    </View>
                </View>
                )
        }
        else if(this.state.input !== "" && this.state.result.length < 1 && this.state.loader === false){
            return(
                <View style={styles.Container}>
                <View style = {styles.Header}>
                <Image style={styles.Logo} source={require('../../assets/InstachatLogo.jpg')}resizeMode='cover'/>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
                </View>
                    <View style = {styles.BuscadorContainer}>
                        <TextInput style = {styles.BuscadorInput} placeholder = "Buscar usuarios" onChangeText = {text => {this.Buscar(text)}}/>
                    </View>
                    <View>
                        <Image style={styles.NoLoadImg} source={require('../../assets/ProfileIcon.jpg')}resizeMode='cover'/>
                        <Text style={styles.NoResult}>No hay resultados para su busqueda</Text>
                    </View>
                </View>
                )   
        }
        else if(this.state.loader === true){
            return(
                <View style={styles.Container}>
                <View style = {styles.Header}>
                    <Image style={styles.Logo} source={require('../../assets/InstachatLogo.jpg')}resizeMode='cover'/>
                    <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                        <Text style = {styles.text}> Logout </Text>
                    </TouchableOpacity>
                </View>
                    <View style = {styles.BuscadorContainer}>
                        <TextInput style = {styles.BuscadorInput} placeholder = "Buscar usuarios" onChangeText = {text => {this.Buscar(text)}}/>
                    </View>
                    <View style = {styles.ActivityIndicator}>
                        <ActivityIndicator color = '#003c46' size = 'large'/>   
                    </View>
                    
                </View>
                )   
        }
        else{
            return(
            <View style={styles.Container}>
            <View style = {styles.Header}>
                <Image style={styles.Logo} source={require('../../assets/InstachatLogo.jpg')}resizeMode='cover'/>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
            </View>
                <View style = {styles.BuscadorContainer}>
                    <TextInput style = {styles.BuscadorInput} placeholder = "Buscar usuarios" onChangeText = {text => {this.Buscar(text)}}/>
                </View>
                <View>
                    <FlatList
                        data = {this.state.result}
                        keyExtractor = {result => result.id.toString()}
                        renderItem = { ({item}) =>  <Post dataItem = {item}></Post> }
                    />
                </View>
            </View>
            )   
        }
        
                    
        


    }
}

const styles = StyleSheet.create({
    NoResult: {
        color: 'black',
        fontSize: '5vw',
        textAlign: 'center',
    },
    Container: {
        flex: 1,
        backgroundColor: '#64a5af',
    },
    Header: {
        paddingBottom: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#003c46',
        fontSize: '16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    Logo:{
        height: '8vh',
        width: '14vw',
        marginLeft: 12,
    },
    text: {

    },
    button:{
        borderWidth: 2,
        borderColor: '#64a5af',
        borderRadius: 4,
        backgroundColor: '#64a5af',
        marginRight: 12
    },
    BuscadorContainer:{
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#003c46'
    },
    BuscadorInput: {
        textAlign: 'center',
        height: '3vh',
        width: '66vw',
        borderWidth: 2,
        borderColor: '#003c46',
        borderRadius: 4,
        alignItems: 'center',
        color: '#64a5af',
        backgroundColor: '#003c46',
        marginVertical: '2vh',
    },
    ActivityIndicator: {
        marginTop: '3vh'
    },
    NoLoadImg: {
        height: '14vh',
        width: '26vw',
        alignSelf: 'center',
    }
    
})