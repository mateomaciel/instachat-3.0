import React, { Component }  from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

export default class Screen1 extends Component{
    constructor (props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <Text> estas logeado </Text>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
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
        alignItems: "center",
        backgroundColor: 'yellow'
    }
})