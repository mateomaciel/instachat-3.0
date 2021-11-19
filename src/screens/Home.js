import React, { Component }  from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';

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
                <Image style={styles.Logo} source={require('../../assets/InstachatLogo.jpg')}resizeMode='cover'/>
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
    PostContainer: {

        
    },
    text: {

    },
    button:{
        borderWidth: 2,
        borderColor: '#64a5af',
        borderRadius: 4,
        backgroundColor: '#64a5af',
        marginRight: 12
    }
})