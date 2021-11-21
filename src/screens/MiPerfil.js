import React, { Component }  from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post'

export default class MiPerfil extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: ""
        }
    }
    componentDidMount(){
        console.log(auth.currentUser)
    db.collection('posts').where('owner', '==', `${auth.currentUser.displayName}`).orderBy('createdAt', 'desc').onSnapshot(
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
    )}

    delete(id){
        const posteoActualizar = db.collection('posts').doc(id)
        posteoActualizar.delete()
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
            <View  style = {styles.UserInfo}>
            <Image style={styles.ProfIm} source={require('../../assets/ProfileIcon.jpg')}resizeMode='cover'/>
            <View style={styles.Username}>
                <Text style={styles.UsernameText}>{auth.currentUser.displayName}</Text>
            </View>
            <View style={styles.NdePosts}>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Publicaciones: {this.state.posts.length}</Text>
                <Text>Ultimo logueo: {auth.currentUser.metadata.lastSignInTime}</Text>
            </View>
            </View>
            
            <View style={styles.UserPosts}>
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) =>  
                <Post dataItem = {item}></Post> 
                }
                />
             
            </View>
        </View>
        
        )}
        
}

const styles = StyleSheet.create({
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
    button:{
        borderWidth: 2,
        borderColor: '#64a5af',
        borderRadius: 4,
        backgroundColor: '#64a5af',
        marginRight: 12
    },
    text: {

    },
    UserInfo: {
        backgroundColor: '#64a5af',
        borderBottomWidth: 2,
        paddingBottom: '2vh',
        borderColor: '#003c46'
    },
    Container: {
        flex: 1,
        backgroundColor: '#64a5af',
    },
    ProfIm: {
        width: '24vw',
        height: '10vh',
        alignSelf: 'center'
    },
    Username: {
        alignItems: 'center',
        
    },
    UsernameText: {
        fontSize: '7vw'
    },
    NdePosts: {
        alignItems: 'center',

    },

})