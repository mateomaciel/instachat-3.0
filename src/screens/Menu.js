import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { auth } from '../firebase/config';
import CreatePost from './CreatePost';
import MiPerfil from './MiPerfil';
import Buscador from './Buscador'

export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
        }
    }
    componentDidMount(){
        //metodo para cuando se refresca la pagina
        auth.onAuthStateChanged( user => {
            if (user) {
                this.setState({
                    loggedIn: true
                })
            }
        })
    }
    
    handleLogin(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( response => {
            console.log(response);
            this.setState({
                loggedIn: true
            })
        })
        .catch( response => {
            console.log(response);
            alert("Error en el logge");
            this.setState({
                error: "Error en loggeo"
            })
        })
    }
    
    handleRegister(email, password, username) {
        //alert(`REGISTRO: usuario: ${this.state.email}, password: ${this.state.password}`)
        auth.createUserWithEmailAndPassword(email, password)
        .then( response => {
            console.log(response);
            response.user.updateProfile({
                displayName: username
            })
            this.setState({
                loggedIn: true
            })
        })
        .catch( error => {
            console.log(error);
            alert(error);
            this.setState({
                error: "Fallo en el registro"
            })
        })
    }

    handleLogout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const Drawer = createDrawerNavigator();
    
        return(
            <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Login">
                        {this.state.loggedIn === true ? 
                        <>
                        <Drawer.Screen name = "Home">
                            {props => <Home {...props} handleLogout={()=>this.handleLogout()}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name = "CreatePost">
                                {props => <CreatePost {...props}/>}
                            </Drawer.Screen>
                        <Drawer.Screen name = "Mi perfil">
                                {props => <MiPerfil {...props} handleLogout={()=>this.handleLogout()}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name = "Buscar">
                                {props => <Buscador {...props}/>}
                        </Drawer.Screen>
                        </>
                        :
                        <>
                            <Drawer.Screen name="Login">
                                {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name = "Registro">
                                {props => <Register {...props} handleRegister={(email, password, username)=>this.handleRegister(email, password, username)}/>}
                            </Drawer.Screen>
                        </>
                    }
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
}