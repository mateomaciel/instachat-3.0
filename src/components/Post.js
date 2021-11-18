import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            liked: false,
            likes: 0,
            showModal: false,
        }
    }

    componentDidMount(){
        if (this.props.dataItem){
            if (this.props.dataItem.data.likes.length !== 0){
                this.setState({
                    likes: this.props.dataItem.data.likes.length
                })
                if (this.props.dataItem.data.likes.includes(auth.currentUser.email)){
                    this.setState({
                        liked: true
                    })
                }
            }
        }
    }

    onLike(){
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
        
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: true,
                likes: this.state.likes + 1
            })
        })
    }

    onDislike(){
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
        
        posteoActualizar.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: false,
                likes: this.state.likes - 1
            })
        })
    }

       //Muestra el modal
       showModal(){
        console.log('Mostrando modal')
        this.setState({
            showModal: true,
        })
    }
    
    //Cierra el modal
    closeModal(){
        console.log('Cerrando modal')
        this.setState({
            showModal: false,
        })
    }
    
    render(){

        
        
        return(
            <View stlye={styles.container}>
                <View style={styles.UserContainer}>
                    <Text>{this.props.dataItem.data.owner}</Text>
                </View>
                <View style={styles.ImgContainer}>
                    <Image style={styles.image}
                    source={{uri:`${this.props.dataItem.data.photo}`}}
                    resizeMode='cover'/>
                </View>
                <View style={styles.DescContainer}>
                    <Text>{this.props.dataItem.data.description}</Text>
                </View>
                <View style={styles.LikeContainer}>
                    <Text>Likes: {this.state.likes}</Text>
                </View>
                <View style={styles.LikeButtonContainer}>
                    {
                    !this.state.liked ?
                    <TouchableOpacity onPress = {()=> this.onLike()}>
                        <Text>
                            Like
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress = {()=> this.onDislike()}>
                        <Text>
                            Unlike
                        </Text>
                    </TouchableOpacity>
                    }
                </View>
                <View style={styles.CAContainer}>
                    <Text>{this.props.dataItem.data.createdAt}</Text> 
                </View>  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffd77e',
        marginBottom: '20px',
        justifyContent: 'space-around'
        
    },
    UserContainer: {
        flex: 1,
        marginBottom: '10px',
        backgroundColor: '#ffd77e'
    },
    ImgContainer: {
        flex: 1,
        marginBottom: '10px',
        height: '100%',
    },
    DescContainer: {
        flex: 1,
        marginBottom: '10px',
    },
    LikeContainer: {
        flex: 1,
        marginBottom: '10px',
    },
    LikeButtonContainer: {
        flex: 1,
        marginBottom: '10px',
    },
    CAContainer:{
        flex: 1,
        marginBottom: '10px',
    }
})