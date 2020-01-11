import React from 'react';
import {StyleSheet, View,Text,ImageBackground, KeyboardAvoidingView} from 'react-native';
import {Item, Label, Input,Button,Container,Left,Header,Body, Content,Icon, Card, CardItem} from 'native-base';
import { AsyncStorage,ScrollView,Animated, Dimensions, Keyboard, UIManager } from 'react-native';
import axios from 'axios';

// var myBackground = require('../assets/icons/signin_img10.jpg');
// var height = Dimensions.get('window').height;
// var width = Dimensions.get('window').width;

class CreateTeam extends React.Component{
    static navigationOptions = {
        header: null,
     }
    
constructor(props){
	super(props)
	this.state={
       // email:'',
        name:'',
        nameFlag:'',
        contact:'',
        contactFlag:'',
        city:'',
        cityFlag:'',
        player_id:""
    }
    this.getPlayerID();
}


getPlayerID = () => {

    AsyncStorage.getItem('userlogin')
    .then(string=>{
      console.log(string);
      this.setState(
        {userLogin: JSON.parse(string)}
        );
        var player_id = this.state.userLogin.id;
        this.setState({player_id: player_id})
        console.log("check email");
        console.log(player_id);
      }
     );
}

createTeam=()=>{
  var self=this;
  axios.post(global.url+"/api/createTeam",{
  player_id:self.state.player_id,
  contact:self.state.contact,
  city:self.state.city,
  name:self.state.name,
    }).then(function(response){
        console.log("hi")
      console.log(response.data); 
        
}).catch
self.props.navigation.navigate('MainPage');

}
validate=()=>{
    if(this.state.name === ''){
        this.setState({nameFlag:true});
        }
        else if(this.state.contact === ''){
            this.setState({contactFlag:true});
            }
            else if(this.state.contact === ''){
                this.setState({contactFlag:true});
                }
                else{
                    this.createTeam();
                }
}


// searchItem=()=>{
//   var self=this;
//     axios.post("http://192.168.5.107:8000/api/store",{
//       first_name:self.state.first_name,
//       last_name:self.state.last_name,
//       email:self.state.email,
//       dob:self.state.dob,
//       city:self.state.city,
//       address:self.state.address,
//       password:self.state.password,
//       contact:self.state.contact,
//     }).then(function(response){
//     console.log(response.data);

//     }).catch(function(error){
//       console.log(error);
//     })
//     this.props.navigation.navigate('SignIn');
// }

// _storeEmail = async () => {
//     alph=/^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/
    
    
//     if(alph.test(this.state.email)){
//       try {
  
//        // await AsyncStorage.setItem('email', this.state.email);
//         this._storeName();
//       } catch (error) {
//         // Error saving data
//       }
    
// }
//     else{
//         console.log("email is invalid !!!")
//         this.setState({emailflag:"email is invalid !!!"})
        
//       }  
//   };
//   _storeName = async () => {
//       this. _storeContact();   
//   };
//   _storeContact = async () => {
//     num=/^03[0-9]{2}[0-9]{7}$/
//     ///^[\d]{4}-[\d]{7}$/
//     if(num.test(this.state.contact)){
//         try {
    
//          // await AsyncStorage.setItem('contact', this.state.contact);
//           this._storePassword();
//         } catch (error) {
//           // Error saving data
//         }
//       }
//       else{
//               console.log("Contact number is invalid !!!")
//               this.setState({contactflag:"Contact number is invalid !!!"})
//       }
//   };
//   _storePassword = async () => {
  
//   if(this.state.password===this.state.confrmpassword){
//     this.searchItem();
//   } 
//   else{
//     this.setState({cnfPassflag:"password is not matched !!!"})
//   } 
//       //await AsyncStorage.setItem('password',  this.state.password);
//       //alert(this.state.password);
     
// //      this.props.navigation.navigate('SignIn');
  
//   };

render(){
    return(
     
        <View style={{flex:1}}>
                <Container  style={{paddingTop:23,backgroundColor:'#154360'}}>    
                    <Header style={{backgroundColor:'#3C7DFE'}} >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.navigate('CreateJoin')} >
                            <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>Create Your Team</Text>
                        </Body>
                    </Header>
                    <KeyboardAvoidingView styles={{fles:1}} behavior="padding" enabled />                       
         <Content>
          <Card >
            <CardItem style={{backgroundColor:"#fff"}} >
              <Body>
              <Item floatingLabel first>
                    <Label style={{color:"black",fontWeight:'bold'}}>Team Name</Label>
                    <Input
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({name:text})}
                    returnKeyType={"next"}
                    onSubmitEditing={event=>{
                      this._inputDesc._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                {this.state.nameFlag ? <Text style={{color:"red",fontWeight:'bold'}}>
                      field is empty
                    </Text> 
                    : 
                    <View></View>}
                
              <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>City</Label>
                    <Input 
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({city:text})}
                    getRef={c=>(this._inputDesc=c)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputDes._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                </Item>
                {this.state.nameFlag ? <Text style={{color:"red",fontWeight:'bold'}}>
                      field is empty
                    </Text> 
                    : 
                    <View></View>}
                <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Contact #</Label>
                    <Input
                    placeholder="mm/dd/yyyy"
                    autoCorrect={false}
                    onChangeText={(text)=>this.setState({contact:text})}
                    getRef={a=>(this._inputDes=a)}
                    blurOnSubmit={true}
                    />
                </Item>
                {this.state.nameFlag ? <Text style={{color:"red",fontWeight:'bold'}}>
                      field is empty
                    </Text> 
                    : 
                    <View></View>}
                <Button
                    //primary
                    style={{backgroundColor:'#3C7DFE'}} 
                    block
                    onPress={this.validate}
                >
                    <Text style={{color: 'white'}}>Create</Text>
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
        // width: width,
        // height: height
    },
error:{
        borderColor:'red',
        borderWidth:1,
                },
    
});
export default CreateTeam;