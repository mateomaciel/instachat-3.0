import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'
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
            comment:"",
            filteredComments: this.props.dataItem.data.comments,
            ModalText: "Ver comentarios"
            
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

    ModalLogic(){
        if(this.state.showModal === true){
            this.setState({
                showModal: false,
                ModalText: "Ver comentarios"
            })
        }
        else{
            this.setState({
                showModal: true,
                ModalText: "Esconder comentarios"
            })
        }
    }



    delete(id){
        const posteoActualizar = db.collection('posts').doc(id)
        posteoActualizar.delete()
    }

    ControlComment(){
        if (this.state.comment !== "" ){
            this.handleComment(this.state.comment)
        }
        else {
            alert("Completar los campos!")
        }
    }

    handleComment(){

    
        const posteoActualizar = db.collection('posts').doc(this.props.dataItem.id)
        const comment ={user:auth.currentUser.email, comment: this.state.comment, fecha:new Date(), displayname:auth.currentUser.displayName}
        
        console.log(posteoActualizar)

        posteoActualizar.update({
            comments:firebase.firestore.FieldValue.arrayUnion(comment)
        })

        .then(() => {
            this.setState({
                comment:"",
                filteredComments: this.props.dataItem.data.comments
            })
            
            console.log(auth.currentUser)
        })

     
    }

 
    render(){

        if(auth.currentUser.displayName === this.props.dataItem.data.owner && this.state.filteredComments.length > 0){
            return(
                <View style={styles.container}>
                <View style = {styles.Usernamecontainer2}>
                    <TouchableOpacity onPress ={()=> this.delete(this.props.dataItem.id)} style = {styles.DelButton}>
                        <Text style = {styles.text}>
                            Eliminar publicaci??n
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.Username2}>{this.props.dataItem.data.owner}</Text>
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

                <TouchableOpacity style = {styles.ModalButton} onPress={()=>{this.ModalLogic()}}>
                    <Text style = {styles.text}>{this.state.ModalText}</Text>
                </TouchableOpacity>

                 {
                    this.state.showModal ?

                        <Modal 
                        animationType = 'slide'
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                    

                    <View style = {styles.CommentBox}>
                    <TextInput placeholder = "Escribe un comentario" 
                    keyboardType='default' 
                    style = {styles.CommentInput}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}/>

                    <TouchableOpacity style = {styles.CommentButton} onPress={() => this.ControlComment()}>
                        <Text style = {styles.text}>Comentar</Text>
                    </TouchableOpacity>
                    </View>
                
                
                    <View style={styles.CommentDisplay}>
                  <FlatList
                    data={ this.state.filteredComments }
                    keyExtractor={ item => item.id}
                    renderItem={ ({item}) => 
                    <Text style = {styles.text}>{item.displayname}: {item.comment}</Text>
                    }
                    />  
                    </View>
                

                    </Modal>
                        
                        :
                        null
                        
                }
                
                
                
                <Text style={styles.CA}>Publicado hace: {Math.ceil((Date.now()- this.props.dataItem.data.createdAt)/1000/3600)} horas</Text>

            </View>
            
            )
        }
        else if(auth.currentUser.displayName !== this.props.dataItem.data.owner && this.state.filteredComments.length > 0){
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
                
                <TouchableOpacity style = {styles.ModalButton} onPress={()=>{this.ModalLogic()}}>
                    <Text style = {styles.text}>{this.state.ModalText}</Text>
                </TouchableOpacity>
                { 
                this.state.showModal ?

                        <Modal 
                        animationType = 'slide'
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                            
                               
                    <View style = {styles.CommentBox}>
                    <TextInput placeholder = "Escribe un comentario" 
                    keyboardType='default' 
                    style = {styles.CommentInput}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}/>

                    <TouchableOpacity style = {styles.CommentButton} onPress={() => this.ControlComment()}>
                        <Text style = {styles.text}>Comentar</Text>
                    </TouchableOpacity>
                </View>
                
                
                <View style={styles.CommentDisplay}>
                    <FlatList
                    data={ this.state.filteredComments }
                    keyExtractor={ item => item.id}
                    renderItem={ ({item}) =>
                    <Text style={styles.text}>{item.displayname}: {item.comment}</Text>
                    }
                    /> 
                </View>

                           

                        </Modal>
                        :
                        null
                }
                 

              
                

                <Text style={styles.CA}>Publicado hace: {Math.ceil((Date.now()- this.props.dataItem.data.createdAt)/1000/3600)} horas</Text>
            </View>
        )
        }
        else if(auth.currentUser.displayName === this.props.dataItem.data.owner && this.state.filteredComments.length < 1){
            return(
                <View style={styles.container}>
                <View style = {styles.Usernamecontainer2}>
                    <TouchableOpacity onPress ={()=> this.delete(this.props.dataItem.id)} style = {styles.DelButton}>
                        <Text style = {styles.text}>
                            Eliminar publicaci??n
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.Username2}>{this.props.dataItem.data.owner}</Text>
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

                <TouchableOpacity style = {styles.ModalButton} onPress={()=>{this.ModalLogic()}}>
                    <Text style = {styles.text}>{this.state.ModalText}</Text>
                </TouchableOpacity>
                { 
                this.state.showModal ?

                        <Modal 
                        animationType = 'slide'
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                
                <View style = {styles.CommentBox}>
                    <TextInput placeholder = "Escribe un comentario" 
                    keyboardType='default' 
                    style = {styles.CommentInput}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}/>

                    <TouchableOpacity style = {styles.CommentButton} onPress={() => this.ControlComment()}>
                        <Text style = {styles.text}>Comentar</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.CommentDisplay}>
                    <Text style={styles.text}>Todav??a no hay comentarios</Text> 
                </View>

                  </Modal>
                        :
                        null
                }
                

                <Text style={styles.CA}>Publicado hace: {Math.ceil((Date.now()- this.props.dataItem.data.createdAt)/1000/3600)} horas</Text>

       
            </View>

            
            
            )
        }
        else if(auth.currentUser.displayName !== this.props.dataItem.data.owner && this.state.filteredComments.length < 1){
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

                <TouchableOpacity style = {styles.ModalButton} onPress={()=>{this.ModalLogic()}}>
                    <Text style = {styles.text}>{this.state.ModalText}</Text>
                </TouchableOpacity>
                { 
                this.state.showModal ?

                        <Modal 
                        animationType = 'slide'
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                    
                    <View style = {styles.CommentBox}>
                        <TextInput placeholder = "Escribe un comentario" 
                        keyboardType='default' 
                        style = {styles.CommentInput}
                        onChangeText={text => this.setState({ comment: text })}
                        value = {this.state.comment}/>
    
                        <TouchableOpacity style = {styles.CommentButton} onPress={() => this.ControlComment()}>
                            <Text style = {styles.text}>Comentar</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                    <View style={styles.CommentDisplay}>
                        <Text style={styles.text}>Todav??a no hay comentarios</Text> 
                    </View>

                      </Modal>
                        :
                        null
                }
                    
    
                    <Text style={styles.CA}>Publicado hace: {Math.ceil((Date.now()- this.props.dataItem.data.createdAt)/1000/3600)} horas</Text>
                </View>
            )
        }
        
        
        
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
        marginBottom: 8,
        borderBottomWidth: 2,
        borderColor: '#003c46',
    },
    Usernamecontainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    Usernamecontainer2: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Username: {
        fontSize: 18,
        paddingLeft: 3
    },
    Username2: {
        fontSize: 18,
        paddingRight: '32vw'
    },
    ProfileIcon: {
        width: '8vw',
        height: '4vh',
    },
    Desc: {
        fontSize: 14,
        paddingLeft: 13,
        paddingTop: 4,
        height: '4vh'
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
        marginTop: '1vh',
        marginLeft: '2vw',
       
    },

    like: {
        height: '3vh',
        width: '6vw',
        marginTop: 4,
        marginLeft: 6,
    },

    CommentBox: {
        marginTop: '1vh',
        flexDirection: 'row',
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
        marginLeft: '2vw',
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
    },
    DelButton: {
        alignSelf: 'center',
        marginRight: '2vw',
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
    ModalButton: {
        marginLeft: '2vw',
        borderWidth: 2,
        borderColor: '#003c46',
        backgroundColor: '#003c46',
        borderRadius: 4,
        alignSelf: 'flex-start',
        paddingTop: '0.3vw',
        paddingLeft: '0.3vw',
        paddingRight: '0.3vw',
        paddingBottom: '0.6vw',
    },
    modal: {
        borderWidth: 0,
    }
})