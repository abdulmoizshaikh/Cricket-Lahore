import React from 'react';
import {StyleSheet, View,Text,ImageBackground,Alert,ToastAndroid, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {Item, Label, Input,Button,Container,Left,Header,Body, Content,Icon, Card, CardItem} from 'native-base';
import { AsyncStorage,ScrollView,Animated, Dimensions, Keyboard, UIManager } from 'react-native';
import axios from 'axios';

var myBackground = require('../assets/icons/backgrnd.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class SelectedEleven extends React.Component{
    static navigationOptions = {
        header: null,
     }
    
constructor(props){
	super(props)
	this.state={
       selectedPlayers:[],
        userLogin:[],
        team_id:'',
        name:'',
        id:'',
        type:'',
        delID:'',
    }
    this.getEmail();
}
getEmail = () => {
  
    AsyncStorage.getItem('userlogin')
    .then(string=>{
      //console.log(string);
      this.setState(
        {userLogin: JSON.parse(string)}
        );
        var id = this.state.userLogin.id;
        this.setState({id: id});
       // this.gettrmntID();
       
      }
     );
     
    AsyncStorage.getItem('teamid')
    .then(string=>{
      //console.log(string);
      this.setState(
        {team_id: JSON.parse(string)}
        );
       console.log(this.state.team_id);
         this.getteamPlayer(); 
      }
     );
   
}

componentWillMount() {
  this._subscribe = this.props.navigation.addListener(
    "didFocus",
    () => {
      this.getteamPlayer();
      //Put your Data loading function here instead of my this.LoadData()
    }
  );
   }

getteamPlayer=()=>{
    var self=this;
 axios.post(global.url+"/api/showselectedplayer",{
     team_id:self.state.team_id,
    }).then(function(response){
     if(response.data.success){
     self.setState({selectedPlayers:response.data.data});
     }
     else{
       console.log("error")
     }
})
}


Capitalize=(str)=>{
  return str.charAt(0).toUpperCase() + str.slice(1);
  }

dropplayer=()=>{
  
  var self=this
 axios.post(global.url+"/api/updateStatus",{
  player_id:self.state.delID,
  status:"not",
    }).then(function(response){
        
      console.log(response.data.message);
      ToastAndroid.show("player Droped Successfully", ToastAndroid.LONG);
      self.getteamPlayer() 
})
}
_twoOptionAlertHandler=()=>{
  Alert.alert(
    //title
    'Alert !!!',
    //body
    'You really want to Drop the player...?',
    [
      {text: 'Yes', onPress:this.dropplayer},
      {text: 'No', onPress: () => console.log(this.state.delID), style: 'cancel'},
    ],
    { cancelable: false }
    //clicking out side of alert will not cancel
  );
    }



render(){
    return(
     
        <View style={{flex:1}}>
         <Container  style={{paddingTop:23,backgroundColor:'#154360'}}>
                <ImageBackground source={myBackground} style={styles.backgroundImage}>    
            <Header style={{backgroundColor:'#154360'}} >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.navigate('MainPage')} >
                            <Icon name='arrow-back' />
                            
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>Selected 11</Text>
                        </Body>
                    </Header> 

                    <Content style={{padding:10}}>

                    {this.state.selectedPlayers.map(selectedPlayers=>(
                    <Card key={selectedPlayers.get_username.id}>
                       <Card>
                    <CardItem style={{backgroundColor:'#154360'}}>
                        <Body>
                            <Text style={{color:"#fff",fontSize:18,fontWeight:'bold'}}>{this.Capitalize(selectedPlayers.get_username.first_name)}</Text>
                        </Body>
                    </CardItem>
                </Card>
                      <CardItem style={{backgroundColor:"#fff"}}>
                        <Body>

                          <Text style={{color:"black",fontSize:15,fontWeight:'bold'}}><Text style={{color:"black",fontSize:15,fontWeight:'bold'}}>Email    : </Text>  {selectedPlayers.get_username.email}</Text>
                          <Text style={{color:"black",fontSize:15,fontWeight:'bold'}}><Text style={{color:"black",fontSize:15,fontWeight:'bold'}}>Contact  : </Text>  {selectedPlayers.get_username.contact}</Text>
                 
           <Text> </Text>
                     
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Button style={{backgroundColor:'#FF0000',width:80,textAlign:'center',justifyContent:'center',alignItems:'center'}} 
                  onPress={()=>
                    this.setState({delID:selectedPlayers.get_username.id.toString()},this._twoOptionAlertHandler())
                  }><Text style={{color:'#fff',fontWeight:'bold'}}>Drop</Text></Button>

                        </View>
                   
                        </Body>
                      </CardItem>
                    </Card>
                  ))
                  }

        </Content>                     
        </ImageBackground>
    </Container>
</View>
        
    );
}}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',    
        
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
export default SelectedEleven;