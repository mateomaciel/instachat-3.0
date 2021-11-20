import React, { Component }  from "react";
import {View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput} from 'react-native';
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
        )}, 2000);
        
    }
    
    

    render(){
        
        if(this.state.input === "" && this.state.loader === false){
            return(
                <View>
                    <View>
                        <TextInput placeholder = "Buscar usuarios" onChangeText = {text => {this.Buscar(text)}}/>
                    </View>
                    <View>
                        
                    </View>
                </View>
                )
        }
        else if(this.state.input !== "" && this.state.result.length < 1 && this.state.loader === false){
            return(
                <View>
                    <View>
                        <TextInput placeholder = "Buscar usuarios" onChangeText = {text => {this.Buscar(text)}}/>
                    </View>
                    <View>
                        <Text>No hay resultados para su busqueda</Text>
                    </View>
                </View>
                )   
        }
        else if(this.state.loader === true){
            return(
                <View>
                    <View>
                        <TextInput placeholder = "Buscar usuarios" onChangeText = {text => {this.Buscar(text)}}/>
                    </View>
                    <ActivityIndicator color = 'blue' size = 'large'/>
                </View>
                )   
        }
        else{
            return(
            <View>
                <View>
                    <TextInput placeholder = "Buscar usuarios" onChangeText = {text => {this.Buscar(text)}}/>
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
    NoResult: {color: 'black', fontSize: '40px'}
})