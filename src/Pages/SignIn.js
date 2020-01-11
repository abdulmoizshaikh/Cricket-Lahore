import React, {Component} from 'react';
import {View,Dimensions,Text,ImageBackground,ProgressBarAndroid,TouchableOpacity} from 'react-native';
import {Item, Input,Button,Container,Content,Card,CardItem,Header,Body} from 'native-base';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

var myBackground = require('../assets/icons/signin_img10.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class SignIn extends React.Component{
    static navigationOptions = {
    header: null
 }

constructor(props){
	super(props)
	this.state={
    username: '',
    nameValdate:true,
		password:'',
    passwordValdate:true,
    emailflag:'',
    passwordflag:'',
    empty:'',
    showProgress:false,
	}
}

_storeEmail = async() => {
  //this.props.navigation.navigate('Home');
  alph=/^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/
  num=/^03[0-9]{2}[0-9]{7}$/
  ///^[\d]{4}-[\d]{7}$/
  var self=this;

  if(alph.test(this.state.username))
  {  
   if(self.state.password===self.state.empty){
    self.setState({passwordflag:"field is empty !!!"})
   }
  else{ 
    self.setState({showProgress:true}) 
    console.log(global.url+"/api/login");
axios.post(global.url+"/api/login",{
  email:self.state.username,
  password:self.state.password,
  type:"email",
    }).then(function(response){
      console.log(response.data);
      if(response.data.login){
        console.log("if condition")
        var userdata = response.data.data;
        if(response.data.playerPresent){
   AsyncStorage.setItem('userlogin', JSON.stringify(userdata))
  .then(json =>console.log("success"))
   .catch(error=>console.log("error"));
  self.props.navigation.navigate('Home');
}else{
   AsyncStorage.setItem('userlogin', JSON.stringify(userdata))
  .then(json =>console.log("success"))
   .catch(error=>console.log("error"));
   AsyncStorage.setItem('newPlayer', 'new')
  self.props.navigation.navigate('CreateJoin');
}
}else{
      self.setState({passwordflag:"password is not matched !!!"})
    }
    }).catch(function(error){
      self.setState({emailflag:"email Not found !!!"})
     
    })
  }
  }

  else if(num.test(this.state.username))
  { 
    if(self.state.password===self.state.empty){
      self.setState({passwordflag:"field is empty !!!"})
     }
    else{ 
    
axios.post(global.url+"/api/login",{
  email:self.state.username,
  password:self.state.password,
  type:"contact",
    }).then(function(response){
    if(response.data.success){
      console.log(response.data);
        AsyncStorage.setItem('userlogin',response.data.data);
        self.props.navigation.navigate('Home');
    }
    else{
      self.setState({passwordflag:"password is not matched !!!"})
    }
    }).catch(function(error){
      self.setState({emailflag:"email not find !!!"})
     
    })
    }
  }
  else {
    self.setState({emailflag:"invalid entery !!!"})
    self.setState({passwordflag:"field is empty !!!"})
  } 
};



logIn = () =>{
	var email = this.state.email;
	var password = this.state.password;

	this.props.signIn(email,password);
}
render(){
    
    return (
        
		<View style={{flex: 1}}>
         <Container style={{paddingTop:23,backgroundColor:'white'}}>    
            <ImageBackground source={myBackground} style={styles.backgroundImage}>
           
        <Header style={{backgroundColor:'#154360'}} >
          
          <Body>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:25,paddingLeft:120,paddingRight:120}}>Cricket World</Text>
          </Body>
         
        </Header>
     
        <Content style={{paddingTop:'40%'}}  >
          <Card>
            
            <CardItem style={{backgroundColor:"#fff"}} >
              <Body>
              <Item floatingLabel>
                            <Input
                            autoCorrect={false}
                            placeholder="somthing@someserver.com /03001234567"
                            onChangeText={(text)=>this.setState({username: text})}
                            
                        
                            />
                        </Item>
                        <Text style={{color:"red",fontWeight:'bold'}}>
                      {this.state.emailflag}
                    </Text>
                        <Item floatingLabel>
                            <Input
                            autoCorrect={false}
                            placeholder="Password"
                            onChangeText={(text)=>this.setState({password: text})}
                            secureTextEntry 
                            />
                        </Item>
                        <Text style={{color:"red",fontWeight:'bold'}}>
                      {this.state.passwordflag}
                    </Text>
                <Button
                   // primary
                   style={{backgroundColor:'#3C7DFE'}} 
                    block
                    onPress={this._storeEmail}
							  >
                  {this.state.showProgress ? (
  <ProgressBarAndroid
    style={{
      justifyContent: "center",
      alignItems: "center",
      color: "#000",
      
    }}
  />
) :  <Text style={{color: 'white'}}>Sign In</Text> }
							  </Button>
              <Text></Text>
              <TouchableOpacity  onPress={() => this.props.navigation.navigate('Registration')}><Text style={{fontWeight:'bold',color:'red'}}>Don't have an account ? SignUp</Text></TouchableOpacity>
              </Body>
            </CardItem>
         </Card>
        </Content>
            </ImageBackground>
            </Container>  
        </View>
    );
  }
}
const styles={  
inputStyle:{
    flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 10
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
export default SignIn;