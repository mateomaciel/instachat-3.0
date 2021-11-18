import React, { Component }  from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
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
            <View style={styles.Username}>
                {auth.currentUser.displayName}
            </View>
            <View style={styles.UserEmail}>
                {auth.currentUser.email}
            </View>
            <View style={styles.NdePosts}>
                Publicaciones: {this.state.posts.length}
            </View>
            <View style={styles.UltAcceso}>
                Ultimo logueo: {auth.currentUser.metadata.lastSignInTime}
            </View>
            <View style={styles.UserPosts}>
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) =>  
                <>
                <Post dataItem = {item}
                delete ={(id)=> this.delete(id)}></Post> 
                      {
                  <TouchableOpacity onPress ={()=> this.delete(item.id)}>
                  <Text>
                      Borrar
                  </Text>

                </TouchableOpacity>
                
              }
               </>
                }
                />
             
            </View>
           
           
            <View style={styles.Logout}>
                <TouchableOpacity  onPress={() => this.props.handleLogout()}>
                    <Text> Logout </Text>
                </TouchableOpacity>

                
            </View>
        </View>
        
        )}
        
}

const styles = StyleSheet.create({
    Container: {},
    Username: {},
    UserEmail: {},
    NdePosts: {},
    UltAcceso: {},
    UserPosts: {}

})