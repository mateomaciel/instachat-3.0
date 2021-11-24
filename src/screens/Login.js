import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    ControlLogin(){
        if (this.state.email !== "" && this.state.password !== "" ){
            this.props.handleLogin(this.state.email, this.state.password,)
        }
        else {
            alert("Completar los campos!")
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.Header}>
                    <Image style={styles.Logo} source={require('../../assets/InstachatLogo.jpg')}resizeMode='cover'/>
                </View>
                <View style= {styles.LoginContainer}>
                <Text style={styles.textLogIn}>Login</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.ControlLogin()}>
                    <Text style = {styles.text}> Log In </Text>
                </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#64a5af'
    },
    LoginContainer: {
        alignItems: 'center',
        textAlignLast: 'center',
        marginTop: '1vh',
    },
    field: {
        width: '80%',
        backgroundColor: '#003c46',
        color: '#64a5af',
        padding: 10,
        marginVertical: 10
    },
    button: {
        borderWidth: 2,
        borderColor: '#003c46',
        backgroundColor: '#003c46',
        borderRadius: 4,
    },
    Header: {
        paddingBottom: 1,
        width: '100%',
        backgroundColor: '#003c46',
        fontSize: '16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    Logo:{
        height: '8vh',
        width: '14vw',
    },
    text: {
        color: '#64a5af',
        fontVariantCaps: 'all-small-caps',
        fontSize: '4vw'
    },
    textLogIn: {
        fontSize: '6vw',
        fontVariantCaps: 'all-small-caps'
    },
})