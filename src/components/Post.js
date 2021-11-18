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
                <View style = {styles.Usernamecontainer}>
                    <Text style={styles.Username}>{this.props.dataItem.data.owner}</Text>
                    <Image style={styles.ProfileIcon} source={require('../../assets/ProfileIcon.jpg')}resizeMode='cover'/>
                </View>
                <Image style={styles.image}
                    source={{uri:`${this.props.dataItem.data.photo}`}}
                    resizeMode='cover'/>
                <View style = {styles.LikeInfo}>
                {
                    !this.state.liked ?
                    <TouchableOpacity onPress = {()=> this.onLike()}>
                        <Image style={styles.like}source={require('../../assets/unliked.png')}resizeMode='cover'/>

                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress = {()=> this.onDislike()}>
                        <Image style={styles.like}source={require('../../assets/like.png')}resizeMode='cover'/>

                    </TouchableOpacity>
                }
                
                <Text style={styles.LikesInd}>Likes: {this.state.likes}</Text>
                </View>

                <Text style={styles.Desc}>{this.props.dataItem.data.description}</Text>
                
                
                <View style = {styles.CommentBox}>
                    <TextInput placeholder = "Escribe un comentario" keyboardType='default' style = {styles.CommentInput}/>
                    <TouchableOpacity style = {styles.CommentButton}>
                        <Text style = {styles.text}>Comentar</Text>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.CA}>{this.props.dataItem.data.createdAt}</Text>
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
        backgroundColor: '#64a5af',
        marginBottom: '20px',
        borderWidth: 1,
        borderColor: '#64a5af',
    },
    Usernamecontainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    Username: {
        fontSize: 18,
        paddingLeft: 3
    },
    ProfileIcon: {
        width: '8vw',
        height: '4vh',
    },
    Desc: {
        flex: 1,
        fontSize: 14,
        paddingLeft: 13,
        paddingTop: 4,
    },
    LikeInfo: {
        flexDirection: 'row',

    },
    LikesInd: {
        marginTop: 4,
        marginLeft: 5,
        fontSize: 18
        
    },
    LikeButtonContainer: {
        flex: 1,
    },
    CA:{
        flex: 1,
       
    },

    like: {
        height: '3vh',
        width: '6vw',
        marginTop: 4,
        marginLeft: 6,
    },

    CommentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    CommentInput: {
        height: '3vh',
        width: '66vw',
        borderWidth: 2,
        borderColor: '#003c46',
        marginLeft: 6,
        borderRadius: 4,
        alignItems: 'center',
        color: '#64a5af',
        backgroundColor: '#003c46',
    },

    CommentButton: {
        marginRight: '7vw',
        borderWidth: 2,
        borderColor: '#003c46',
        backgroundColor: '#003c46',
        borderRadius: 4,
        paddingTop: '0.3vw',
        paddingLeft: '0.3vw',
        paddingRight: '0.3vw',
        paddingBottom: '0.6vw',
        alignItems: 'center',
    },
    text:{
        color: '#64a5af'
    }
       
})