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
            <View style={styles.Container}>

                <View style = {styles.Header}>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
                </View>
                <View style = {styles.PostContainer}>
                    <FlatList
                        data = {this.state.posts}
                        keyExtractor = {post => post.id.toString()}
                        renderItem = { ({item}) =>  <Post dataItem = {item}></Post> }
                    /> 
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        /*backgroundColor: '#f99d5a'*/
    },
    Header: {
        flex: 1,
        width: '100%'
    },
    PostContainer: {
        flex: 15,

        
    }
})