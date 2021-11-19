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
                comment: ""
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
                <Image
                    source ={{uri: this.state.photo}}
                    style = {styles.imagen}
                />
                
               
        
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="What are you thinking?"
                    multiline={true}
                    numberOfLines = {4}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.handlePost()}>
                    <Text style = {styles.text}> Post </Text>
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
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: 'green'
    }
})