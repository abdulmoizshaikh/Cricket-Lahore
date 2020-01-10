import React, {Component} from 'react';
import {View,Dimensions,Text,ImageBackground,TouchableOpacity} from 'react-native';
import {Form, Item, Label, Input,Button,Container,Left,Right,Icon,Content,Card,CardItem,Header,Body} from 'native-base';
import { AsyncStorage } from 'react-native';

var myBackground = require('../assets/icons/start_img.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class Startapp extends React.Component{
    static navigationOptions = {
    header: null
 }


render(){
    
    return (
        
		<View style={{flex: 1}}>
            <ImageBackground source={myBackground} style={styles.backgroundImage}>  
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                    //primary
                   style={{backgroundColor:'#3C7DFE'}} 
                    onPress={() => this.props.navigation.navigate('Registration')}
                    >
                    <Text style={{color: 'white',paddingLeft:'35%',paddingRight:'20%'}}>Register</Text>
                    </Button>
                </View>
               
                <View style={styles.buttonContainer}>
                    <Button
                    //danger 
                    style={{backgroundColor:'#FF0000'}} 
                    
                    onPress={() => this.props.navigation.navigate('SignIn')}

                   >
                    <Text style={{color: 'white',paddingLeft:'40%',paddingRight:'40%'}}>Login</Text>
                    </Button>
                </View>
            </View>
            </ImageBackground>  
        </View>
    );
  }
}
const styles={
    container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom:'15%'    
    
  },  
inputStyle:{
    flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 10
  },
  buttonContainer: {
    flex: 1,
    paddingRight:10,
    paddingLeft:10,
    justifyContent: 'flex-end',
  },
backgroundImage: {
	flex: 1,
    resizeMode: 'cover',
    width: width,
		height: height
    }, 
    error:{
	
        borderColor:'red',
        borderWidth:1,
                },
}
export default Startapp;