import React, {Component} from 'react';
import {StyleSheet, View,Text,ImageBackground, KeyboardAvoidingView,TouchableOpacity, Modal,AsyncStorage,ScrollView, TouchableHighlight} from 'react-native';
import {Item, Label, Input,Button,Container,Left,Header,Body, Content,Icon, Card, CardItem,Picker} from 'native-base';
import axios from 'axios';

export default class JoinTeam extends Component{
    static navigationOptions = {
        header: null,
     }
    
constructor(){
	super()
	this.state={
        totalTeams:[],
        userLogin:[],
        email:'',
        type:'',
        team_id:'',
        modalVisible: false,
        selected:'',
    }
    this.teamsData();
}
setModalVisible(visible,id) {
    this.setState({modalVisible: visible});
    this.setState({team_id:id});
  }
  savedata=()=>{
      this.setModalVisible(!this.state.modalVisible);
      console.log(this.state.selected);
      console.log(); 
      var self=this;

axios.post(global.url+"/api/addPlayer",{
  email:self.state.email,
  team_id:this.state.team_id,
  role_id:this.state.selected,
  type:"email",
    }).then(function(response){
        console.log("hi")
      console.log(response.data);
      self.props.navigation.navigate('MainPage')   
})    
  }

teamsData=()=>{
    //send response
    var self=this;
    axios.get(global.url+"/api/team").then(function(response){
        //console.log(response.data);
        self.setState({totalTeams:response.data})
        console.log(self.state.totalTeams);
        //console.log("imhere");
        self.getEmail();
        })

}

getEmail = () => {

    AsyncStorage.getItem('userlogin')
    .then(string=>{
      console.log(string);
      this.setState(
        {userLogin: JSON.parse(string)}
        );
        var email = this.state.userLogin.email;
        this.setState({email: email})
        //.log("check email");
        //console.log(email);
      }
     );
}


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
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>Select Team</Text>
                        </Body>
                    </Header>                      
                    {/* onPress={() => this.teamSelected(totalTeams.id) */}
         <Content>
         {this.state.totalTeams.length>0 ? this.state.totalTeams.map(totalTeams=>(
          <TouchableOpacity  key={totalTeams.id}  onPress={() => {
            this.setModalVisible(true,totalTeams.id);
          }}>        
            <Card key={totalTeams.id}>
              <CardItem style={{backgroundColor:"#fff"}}>
                <Body>
                  <Text style={{color:"black"}}>{totalTeams.name}</Text>
                  <Text style={{color:"black"}}>{totalTeams.city}</Text>
                  <Text style={{color:"black"}}>{totalTeams.contact}</Text>
                </Body>
              </CardItem>
            </Card>
 
          </TouchableOpacity>
          ))
: <View></View>}
        </Content>
    </Container>
    <Modal
    visible={this.state.modalVisible}
        onRequestClose={() => {
        console.log('Modal has been closed.');
        }}
        presentationStyle = "formSheet"
        animationType="fade"
        >

        <View style={{marginTop: 22}}>
            
        <Picker
              note
              mode="dropdown"
              style={{ width: 250 }}
              selectedValue={this.state.selected}
              onValueChange={value => this.setState({selected: value}, console.log(value))}
            >
              <Picker.Item label="Batsman" value='1' />
              <Picker.Item label="Fast Bowler" value='2' />
              <Picker.Item label="Spin Bowler" value='3' />
              <Picker.Item label="All Rounder" value='4' />
              <Picker.Item label="Wicket Keeper" value='5' />
              <Picker.Item label="Captain" value='6' />
              <Picker.Item label="medium Fast Bowler" value='7'/>
            </Picker>

            <TouchableHighlight
                onPress={this.savedata}
                >
                <Text>Hide Modal</Text>
            </TouchableHighlight>
        </View>
    </Modal>




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