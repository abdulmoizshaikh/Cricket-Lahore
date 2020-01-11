import React from 'react';
import {StyleSheet, View,Text,ImageBackground, KeyboardAvoidingView,ToastAndroid} from 'react-native';
import {Item, Label, Input,Button,Container,Left,Header,Body, Content,Icon, Card, CardItem} from 'native-base';
import { AsyncStorage,ScrollView,Animated, Dimensions, Keyboard, UIManager } from 'react-native';
import axios from 'axios';

var myBackground = require('../assets/icons/signin_img10.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class Registration extends React.Component{
    static navigationOptions = {
        header: null,
     }
    
constructor(props){
	super(props)
	this.state={
        email:'',
        emailValdate:true,
    first_name:'',
    last_name:'',
        nameValdate:true,
        contact:'',
        contactValidate:true,
		password:'',
        passwordValdate:true,
        confrmpassword:'',
        dob:'',
        address:'',
        city:'',
    contactflag:"",
    emailflag:"",
    cnfPassflag:""
	}
}

searchItem=()=>{
  var self=this
  console.log(self.state.first_name)
  console.log(self.state.last_name)
  console.log(self.state.email)
  console.log(self.state.dob)
  console.log(self.state.city)
  console.log(self.state.address)
  console.log(self.state.password)
  console.log(self.state.contact)
  
    axios.post(global.url+"/api/user/store",{
      first_name:self.state.first_name,
      last_name:self.state.last_name,
      email:self.state.email,
      dob:self.state.dob,
      city:self.state.city,
      address:self.state.address,
      password:self.state.password,
      contact:self.state.contact,
    }).then(function(response){
    console.log(response.data)
    if(response.data.success){
      ToastAndroid.show("Your Account is Registered", ToastAndroid.LONG);
      self.props.navigation.navigate('SignIn');
    }
    else{
      ToastAndroid.show("There is an Issue", ToastAndroid.LONG);
    }

    }).catch(function(error){
      console.log(error);
    })
   // self.props.navigation.navigate('SignIn');
}

_storeEmail = async () => {
    alph=/^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/
    
    
    if(alph.test(this.state.email)){
      try {
  
       // await AsyncStorage.setItem('email', this.state.email);
        this._storeContact();
      } catch (error) {
        // Error saving data
      }
    
}
    else{
        console.log("email is invalid !!!")
        this.setState({emailflag:"email is invalid !!!"})
        
      }  
  };
  _storeName = async () => {
      this. _storeContact();   
  };
  _storeContact = async () => {
    num=/^03[0-9]{2}[0-9]{7}$/
    ///^[\d]{4}-[\d]{7}$/
    if(num.test(this.state.contact)){
        try {
    
         // await AsyncStorage.setItem('contact', this.state.contact);
          this._storePassword();
        } catch (error) {
          // Error saving data
        }
      }
      else{
              console.log("Contact number is invalid !!!")
              this.setState({contactflag:"Contact number is invalid !!!"})
      }
  };
  _storePassword = async () => {
  
  if(this.state.password===this.state.confrmpassword){
    this.searchItem();
  } 
  else{
    this.setState({cnfPassflag:"password is not matched !!!"})
  } 
      //await AsyncStorage.setItem('password',  this.state.password);
      //alert(this.state.password);
     
//      this.props.navigation.navigate('SignIn');
  
  };

render(){
    return(
     
        <View style={{flex:1}}>
                <Container  style={{paddingTop:23,backgroundColor:'#CBD8E9'}}>  
                    <Header style={{backgroundColor:'#154360'}} >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.navigate('SignIn')} >
                            <Icon name='arrow-back' />
                            
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Registeration</Text>
                        </Body>
                    </Header>
                    <KeyboardAvoidingView styles={{fles:1}} behavior="padding" enabled />  
            <Content  >
          <Card >
            <CardItem style={{backgroundColor:"#fff"}} >
              <Body>
              <Item floatingLabel first>
                    <Label style={{color:"black",fontWeight:'bold'}}>First_Name</Label>
                    <Input
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({first_name:text})}
                    returnKeyType={"next"}
                    onSubmitEditing={event=>{
                      this._inputDesc._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                <Text>
                </Text>
              <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Last_Name</Label>
                    <Input 
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({last_name:text})}
                    getRef={c=>(this._inputDesc=c)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputDes._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                <Text>
                </Text>
                <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>DOB (mm-dd-yy)</Label>
                    <Input
                    placeholder="mm/dd/yyyy"
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({dob:text})}
                    getRef={a=>(this._inputDes=a)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputDe._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                <Text>
                </Text>
                <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Email</Label>
                    <Input
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({email:text})}
                    getRef={b=>(this._inputDe=b)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputD._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                   
                </Item>
                <Text style={{color:"red",fontWeight:'bold'}}>
                      {this.state.emailflag}
                    </Text>
                <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Contact</Label>
                    <Input
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({contact:text})}
                    getRef={d=>(this._inputD=d)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputDesce._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                <Text style={{color:"red",fontWeight:'bold'}}>
                      {this.state.contactflag}
                    </Text>
                    <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>City</Label>
                    <Input
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({city:text})}
                    getRef={e=>(this._inputDesce=e)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputDesces._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                <Text>
                </Text>
                <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Address</Label>
                    <Input
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({address:text})}
                    getRef={f=>(this._inputDesces=f)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputs._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                <Text>
                </Text>
                <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Passward</Label>
                    <Input
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({password:text})}
                    secureTextEntry 
                    getRef={g=>(this._inputs=g)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputes._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                <Text>
                </Text>
                <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Confirm Passward</Label>
                    <Input
                    autoCorrect={false}
                   onChangeText={(text)=>this.setState({confrmpassword:text})}
                    secureTextEntry 
                    getRef={h=>(this._inputes=h)}
                    blurOnSubmit={true}
                    />
                </Item>
                <Text style={{color:"red",fontWeight:'bold'}}>
                {this.state.cnfPassflag}
                </Text>
                <Button
                    //primary
                    style={{backgroundColor:'#3C7DFE'}} 
                    block
                    onPress={this._storeEmail}
                >
                    <Text style={{color: 'white',fontWeight:'bold'}}>Sign UP</Text>
                </Button>
              </Body>
            </CardItem>
         </Card>
        </Content>
      
        </Container>
        </View>
        
    );
}}

const styles = StyleSheet.create({
container: {      
        alignSelf:'stretch',
    },
textinput:{
        alignSelf:'stretch',
        height:40,
        marginBottom:30,
        color:'#050505',
        borderBottomColor:'#f8f8f8',
        borderBottomWidth:1,
    },
    
header:{
        fontSize:24,
        fontWeight:'bold',
        color:'#050505',
        paddingTop:25,
        paddingBottom:10,
        marginBottom:40,
        borderBottomColor:"#050505",
        borderBottomWidth:1,
    },
button:{
         alignSelf:'stretch',
         alignItems:'center',
         padding:20,
         backgroundColor:'#0A18F5',
         marginTop:30,
    },
btntext:{
        color:'#050505',
        fontWeight:'bold',
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
    
});
export default Registration;