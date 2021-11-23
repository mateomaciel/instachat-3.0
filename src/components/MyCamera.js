import { Camera } from 'expo-camera';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { storage } from '../firebase/config';

export default class MyCamera extends React.Component{
    constructor(props){
        super(props);
        this.camera; 
        this.state = {
            photo: '',
            permission: false,
        }
    }

    componentDidMount(){
        console.log(Camera);
        Camera.getCameraPermissionsAsync()
        .then(response => {
            console.log(response)
            this.setState({
            permission: response.granted
            })
        })
        .catch (error => console.log(error))
    }
    takePicture(){
        if(!this.camera) return;
        this.camera.takePictureAsync()
        .then(photo => {
            console.log(photo)
            this.setState({
                photo: photo.uri
            })
        })
    }

    uploadImage(){
        fetch(this.state.photo)
        .then(res => {
            return res.blob();
        })
        .then(image => {
            
            const ref = storage.ref(`camera/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{                
                ref.getDownloadURL()
                .then(url => {
                    console.log(url);
                    this.setState({
                        photo: ''
                    })
                    this.props.savePhoto(url);
                })
            })
        })
    }

    onReject(){
        this.setState({
            photo: ''
        })
    }

    render(){
        console.log(this.camera)
        console.log(this.state)
        return(
        <View style = {styles.container}>
            {
            this.state.photo ?
            <>
            <Image 
            style={styles.preview}
            source={{uri: this.state.photo}}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.reject}
                    onPress={() => this.onReject()}
                ><Text style={styles.text}>Cancelar</Text></TouchableOpacity>

                <TouchableOpacity
                    style={styles.accept}
                    onPress={() => this.uploadImage()}
                ><Text style={styles.text}>Subir</Text>
                </TouchableOpacity>
            </View>
            </>
            :
            
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.front || Camera.Constants.Type.back}
            
                ref = {referencia => this.camera = referencia}
            >
                {/* Ref hace referencia al objeto Camera, para luego utilizar sus métodos */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.takePicture()}>
                    </TouchableOpacity>
                </View>
            </Camera>
            }
        </View>
        )
    }
    
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        height: 124,
        position: 'absolute',
        bottom: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 124,
        height: '100%',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: '#64a5af',
        paddingTop: 15
    },
    imageContainer: {
        height: '90%',
    },
    preview: {
        width: '100%',
        flex: 6
    },
    btnContainer: {
        flex: 1,
        backgroundColor: '#64a5af',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    accept: {
        width: 100,
        height: 50,
        backgroundColor: '#003c46',
        borderRadius: 50,
    },
    reject: {
        width: 100,
        height: 50,
        backgroundColor: '#003c46',
        borderRadius: 50
    }
})