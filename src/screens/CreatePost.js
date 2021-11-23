import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import MyCamera from '../components/MyCamera';
import { auth, db } from '../firebase/config';

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: "",
            photo: '',
            showCamera: true,
        }
    }

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.photo
        })
        .then(response => {
            console.log(response);
            alert("Posteo realizado!");
            this.setState({
                comment: "",
                photo: '',
                showCamera: true
            })
            console.log(this.props);
            this.props.navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error);
            alert("Hubo un error");
        })
    }

    guardarFoto(url){
        this.setState({
            photo: url,
            showCamera: false,
        })
    }
    
    render(){
        
        return(
            <>
            {this.state.showCamera ? 
            <MyCamera savePhoto = {(url)=>this.guardarFoto(url)}/>
            :
            <>
            <View style={styles.container}>
                <View style = {styles.Header}>
                <Image style={styles.Logo} source={require('../../assets/InstachatLogo.jpg')}resizeMode='cover'/>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text> Logout </Text>
                </TouchableOpacity>
                </View>
                    <View style = {styles.Usernamecontainer}>
                        <Text style={styles.Username}>{auth.currentUser.displayName}</Text>
                        <Image style={styles.ProfileIcon} source={require('../../assets/ProfileIcon.jpg')}resizeMode='cover'/>
                    </View>
                    <Image style={styles.image}
                        source ={{uri: this.state.photo}}
                        resizeMode='cover'/>
                    <View style = {styles.LikeInfo}>
                        <TouchableOpacity>
                            <Image style={styles.like}source={require('../../assets/unliked.png')}resizeMode='cover'/>
                        </TouchableOpacity>
                        <Text style={styles.LikesInd}>Likes: 0</Text>
                    </View>
    
                    <TextInput
                    style={styles.Desc}
                    keyboardType='default'
                    placeholder="Agregá una descripción"
                    multiline={true}
                    numberOfLines = {4}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
                    />
                
                    <View style={styles.CommentDisplay}>
                        <Text style={styles.text}>Todavía no hay comentarios</Text> 
                    </View>
                    
                    
                    
               
            </View>
            <View style={styles.PostContainer}>
                <Text style={styles.CA}>Así se verá tu publicación</Text>
                <TouchableOpacity style = {styles.PostButton} onPress={() => this.handlePost()}>
                    <Text style = {styles.text2}> Publicar </Text>
                </TouchableOpacity> 
            </View>
            </>
            }
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#64a5af'
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
    button:{
        borderWidth: 2,
        borderColor: '#64a5af',
        borderRadius: 4,
        backgroundColor: '#64a5af',
        marginRight: 12
    },
    image: {
        width: '100%',
        height: '50vh',
        
    },
    PostContainer:{
        width: '100%',
        height: '100%',
        backgroundColor: '#64a5af',
        borderBottomWidth: 2,
        borderColor: '#003c46',
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
        height: '6vh',
        borderWidth: 2,
        borderColor: '#003c46',
        marginLeft: '2vw',
        marginRight: '7vw',
        marginTop: '1vh',
        borderRadius: 4,
        alignItems: 'center',
        color: '#64a5af',
        backgroundColor: '#003c46',
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
        alignSelf: 'center',
        fontSize: '4vw',
        marginTop: '2vh',
        color: '#64a5af'
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
        justifyContent: 'space-between',
    },

    text:{
        color: '#64a5af',
    },
    text2: {
      color: '#003c46',  
    },
    CommentDisplay: {
        borderWidth: 2,
        borderRadius: 4,
        padding: '1vw',
        marginTop: '1vh',
        marginLeft: '2vw',
        marginRight: '7vw',
        backgroundColor: '#003c46',
        borderColor: '#003c46',
    },
    PostContainer: {
        backgroundColor: '#003c46',
        paddingBottom: '2vh'
    },
    PostButton: {
        borderWidth: 2,
        borderColor: '#003c46',
        backgroundColor: '#64a5af',
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: '20vw',
        marginVertical: '1vh',
        padding: '1vw'
    }
})