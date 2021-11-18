import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';

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
            <View style={styles.container}>
                <Text style={styles.Username}>{this.props.dataItem.data.owner}</Text>
                 <Image style={styles.image}
                    source={{uri:`${this.props.dataItem.data.photo}`}}
                    resizeMode='cover'/>
                <Text style={styles.Desc}>{this.props.dataItem.data.description}</Text>
                <Text style={styles.Likes}>Likes: {this.state.likes}</Text>
                {
                    !this.state.liked ?
                    <TouchableOpacity onPress = {()=> this.onLike()}>
                        <Image style={styles.like}source={require('../../assets/unliked.png')}resizeMode='contain'/>

                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress = {()=> this.onDislike()}>
                        <Image style={styles.like}source={require('../../assets/like.png')}resizeMode='contain'/>

                    </TouchableOpacity>
                }
                <View style = {styles.CommentBox}>
                    <TextInput placeholder =  "Comentar" keyboardType='default' style = {styles.CommentInput}/>
                    <TouchableOpacity style = {styles.CommentButton}>
                        <Text>Comentar</Text>
                    </TouchableOpacity>
                </View>
                
                <Text stlye={styles.CA}>{this.props.dataItem.data.createdAt}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '50vh',
        
    },
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffd77e',
        marginBottom: '20px',
        
    },
    Username: {
        flex: 1,
        marginBottom: '10px',
        backgroundColor: '#ffd77e'
        
    },
    ImgContainer: {
        flex: 1,
        marginBottom: '10px',
        height: '100%',
    },
    Desc: {
        flex: 1,
        marginBottom: '10px',
    },
    Likes: {
        flex: 1,
        marginBottom: '10px',
    },
    LikeButtonContainer: {
        flex: 1,
        marginBottom: '10px',
    },
    CA:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },

    like: {
        height: 20,
    },

    CommentBox: {
        flex: 1,
        flexDirection: 'row',
    },

    CommentInput: {
        flex: 3,
    },

    CommentButton: {
        flex: 1,
    }

       
})