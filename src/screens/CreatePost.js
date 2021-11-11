import React, { Component }  from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';

export default class CreatePost extends Component{
    constructor (props){
        super(props);
        this.state = {
            comment: ""
        }
    }

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: [],
            comments: []
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

    render(){
        
        return(
            <View style={styles.container}>
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