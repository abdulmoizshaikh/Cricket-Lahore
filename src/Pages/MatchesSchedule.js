import React from 'react';
import {StyleSheet, View,Text,ImageBackground, KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {Item, Label, Input,Button,Container,Left,Header,Body, Content,Icon, Card, CardItem} from 'native-base';
import { AsyncStorage,ScrollView,Animated, Dimensions, Keyboard, UIManager,Modal,TouchableHighlight } from 'react-native';
import axios from 'axios';



class JoinedTrmnt extends React.Component{
    static navigationOptions = {
        header: null,
     }
    
constructor(props){
	super(props)
	this.state={
        trmntMatches:[],
        userLogin:[],
        email:'',
        type:'',
        id:'',
        tournament_id:[],
        flag:false,
        modalVisible: false,
        playing_team1:'',
        playing_team2:'',
        matchID:'',
    }
    this.getteamtID();
}
setModalVisible(visible,id1,id2,id3) {
    this.setState({modalVisible: visible});
    this.setState({playing_team1:id1});
    this.setState({playing_team2:id2});
    this.setState({matchID:id3});
    //console.log(this.state.matchID);
    
  }
  closeModel=()=>{
    this.setModalVisible(!this.state.modalVisible);
  }


getteamtID = async() => {

    AsyncStorage.getItem('tournamentID')
    .then(string=>{
      //console.log(string);
      this.setState(
        {tournament_id: JSON.parse(string)}
        );
       console.log(this.state.tournament_id);
         this.gettournament(); 
      }
     );
   
}
gettournament=()=>{
    var self=this;
 axios.post(global.url+"/api/matchsSchedule",{
    tournament_id:this.state.tournament_id,
    }).then(function(response){
     console.log(response.data.matches);
     self.setState({trmntMatches:response.data.matches});
     self.setState({flag:response.data.success});        
})
}

batting=()=>{
    AsyncStorage.setItem('batting_id1', JSON.stringify(this.state.playing_team1));
    AsyncStorage.setItem('bowling_id1', JSON.stringify(this.state.playing_team2));
    AsyncStorage.setItem('match_id', JSON.stringify(this.state.matchID));
    this.setModalVisible(!this.state.modalVisible);
    this.props.navigation.navigate('StartMatch');
}

bowling=()=>{
    AsyncStorage.setItem('batting_id1', JSON.stringify(this.state.playing_team2));
    AsyncStorage.setItem('bowling_id1', JSON.stringify(this.state.playing_team1));
    AsyncStorage.setItem('match_id', JSON.stringify(this.state.matchID));
    this.setModalVisible(!this.state.modalVisible);
    this.props.navigation.navigate('StartMatch');
}

render(){
    return(
     
        <View style={{flex:1}}>
         <Container  style={{backgroundColor:'#154360'}}>    
            <Header style={{backgroundColor:'#3C7DFE'}} >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.navigate('JoinTrmnt')} >
                            <Icon name='arrow-back' />
                            
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>Matches</Text>
                        </Body>
                    </Header>                      
        
         <Content>
         
{this.state.flag ? this.state.trmntMatches.map(trmntMatches=>(
          <Card key={trmntMatches.id}>
              <CardItem style={{backgroundColor:"#fff"}}>
                <Body>
                  <Text style={{color:"black"}}>{trmntMatches.team_id1}</Text>
                  <Text style={{color:"black"}}>{trmntMatches.team_id2}</Text>
                  <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Button 
                            style={{backgroundColor:'#FF0000'}}
                            onPress={() => {
                                this.setModalVisible(true,trmntMatches.team_id1,trmntMatches.team_id2,trmntMatches.id)}}>
                            <Text style={{color: 'white',justifyContent:'center',alignItems:'center'}}>Start</Text>
                            </Button>
                            <Button 
                            style={{backgroundColor:'#3C7DFE'}} 
                            onPress={() => this.droptrmnt(trmntMatches.id)}
                            >
                            <Text style={{color: 'white',justifyContent:'center',alignItems:'center'}}>Walk Over</Text>
                            </Button>
                        </View>
                </Body>
              </CardItem>
            </Card>

          ))
          : <View><Text style={{color: 'white',fontWeight:'bold',justifyContent:'center',alignItems:'center'}}>No Matches Found</Text></View>}

        </Content>
    </Container>
    <Modal
    visible={this.state.modalVisible}
        onRequestClose={() => {
        console.log('Modal has been closed.');
        }}
        presentationStyle = "formSheet"
        animationType="fade"
        transparent={true}
        >

    <View style={{flex:1,flexDirection:'row'}}>
        
    <Text>{this.state.playing_team1}</Text>
        <View style={styles.container}>
            
                <View >
                    <Button
                    //primary
                   style={{backgroundColor:'#3C7DFE'}}
                   onPress={this.batting} 
                    >
                    <Text style={{color: 'white',paddingLeft:'20%'}}>BAT</Text>
                    </Button>
                </View>
               
                <View>
                    <Button
                    //danger 
                    style={{backgroundColor:'#3C7DFE'}}
                    onPress={this.bowling} 
                   >
                    <Text style={{color: 'white',paddingLeft:'20%'}}>BOWL</Text>
                    </Button>
                </View>
            </View>
            <TouchableHighlight
                onPress={this.closeModel}
                >
                <Text style={{fontWeight:'bold'}}>Hide Modal</Text>
            </TouchableHighlight>
        </View>
    </Modal>
</View>
        
    );
}}

const styles = StyleSheet.create({
container: {      
        flex:1,
        flexDirection: 'row',
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
export default JoinedTrmnt;