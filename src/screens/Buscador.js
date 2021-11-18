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
            arrayVacio: false,
            loader: false
        }
    }

    Buscar(text){
        this.setState({input: text,
                    arrayVacio: false,
                    loader: true})
        this.setState({result: []})
        db.collection('posts').where('owner', '==', `${text.toLowerCase()}`).orderBy('createdAt', 'desc').onSnapshot(
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
                
            }

            
        )
        setTimeout(() => {
            this.setState({
            loader: false
        })
            }, 1000);
        
    }
    
    

    render(){
        console.log(this.state.input)
        console.log(this.state.result)
        console.log(this.state.loader)
        if(this.state.loader === true){
            return(
            <View>
                <View>
                    <TextInput placeholder = "Buscar usuarios" onChangeText = {text => this.Buscar(text)}/>
                </View>
                <View>
                    <ActivityIndicator size = 'large' color = 'blue'/>
                </View>
            </View>
            )
        }
        else if(this.state.result.length === 0 && this.state.input !== ""){
            return(
                <View>
                    <View>
                        <TextInput placeholder = "Buscar usuarios" onChangeText = {text => this.Buscar(text)}/>
                    </View>
                    <View>
                        <Text>No hay resultados</Text>
                    </View>
                </View>
            )
        }
        else{
            return(
            <View>
                <View>
                    <TextInput placeholder = "Buscar usuarios" onChangeText = {text => this.Buscar(text)}/>
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