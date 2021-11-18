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
                <Text>{this.props.dataItem.data.owner}</Text>
                 <Image style={styles.image}
                    source={{uri:`${this.props.dataItem.data.photo}`}}
                    resizeMode='contain'/>
                <Text>{this.props.dataItem.data.description}</Text>
                <Text>{this.props.dataItem.data.createdAt}</Text>
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
                <Text>Likes: {this.state.likes}</Text>
                {/*<Modal>

                </Modal>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 200 
    
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },

    like: {
        height: 20,
        },
       
})