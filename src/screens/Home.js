import React, { Component }  from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import Post from '../components/Post';
import { db } from '../firebase/config';

export default class Screen1 extends Component {
    constructor (props){
        super(props);
        this.state = {
            posts: []
    }
     }

     componentDidMount(){
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let postsAux = [] 
                docs.forEach( doc => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: postsAux
                })
            }
        )
    }

    render(){
        return( 
            <View style={styles.container}>

            
                 <Text> Home </Text>
                <Text> estas logeado </Text>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) =>  <Post dataItem = {item}></Post> }
               />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'yellow'
    }
})