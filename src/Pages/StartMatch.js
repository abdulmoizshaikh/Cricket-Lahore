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
        battingTeam_id:[],
        bowlingTeam_id:[],
        battingSquad:[],
        bowlingSquad:[],
        b1score:'',
        b2score:'',
        bflag:false,
        selectedbat1:"",
        selectedbat2:"",
        selectedbowl:"",
        score1:'',
        score2:'',
        score3:'',
        four:'',
        six:'',
        wide:'',
        noball:'',
        legbye:'',
        bye:'',
        bouncer:'',
        baller:[],
        bat1:[],
        bat2:[],
        tournament_id:[],
        match_id:[],

        
    }
    this.getTeams();
}

batsmanSelection1=()=>{
    var team_id=this.state.battingTeam_id;
console.log("batsmanSelection1");
if(this.state.selectedbat1 == "0"){
    console.log("null");
}else{
    console.log("not null");
var self=this;
axios.post(global.url+"/api/bat1",{
 player_id:this.state.selectedbat1,
}).then(function(response){
 //console.log(response.data.data);
 self.setState({bat1:response.data.data})
 console.log(self.state.bat1.first_name);       
}).catch(function(error){
    console.log(error);
  })
    }

}
batsmanSelection2=()=>{
    var team_id=this.state.battingTeam_id;
    console.log("batsmanSelection2");
    if(this.state.selectedbat2 == "0"){
        console.log("null");
    }else{
        console.log("not null");
var self=this;
axios.post(global.url+"/api/bat2",{
 player_id:this.state.selectedbat2,
}).then(function(response){
 //console.log(response.data.data);
 self.setState({bat2:response.data.data})
 console.log(self.state.bat2.first_name);       
}).catch(function(error){
    console.log(error);
  })
    }
    
    }

bowlerSelection=()=>{
    console.log("bowlerSelection:" + this.state.selectedbowl);
    if(this.state.selectedbowl == "0"){
        console.log("null");
    }else{
        console.log("not null");
var self=this;
axios.post(global.url+"/api/Baller",{
 player_id:this.state.selectedbowl,
}).then(function(response){
 //console.log(response.data.data);
 self.setState({baller:response.data.data})
 console.log(self.state.baller.first_name);       
}).catch(function(error){
    console.log(error);
  })
    }
    }


getTeams = () => {
        AsyncStorage.getItem('batting_id1')
        .then(string=>{
          var bat = JSON.parse(string)
          this.setState(
            {battingTeam_id: bat}
            );
        console.log("bating team ID" + this.state.battingTeam_id);
          }
         );
         AsyncStorage.getItem('bowling_id1')
         .then(string=>{
           var bowl = JSON.parse(string)
           this.setState(
             {bowlingTeam_id: bowl}
             );
             console.log("balling team ID" + this.state.bowlingTeam_id);
             //this.getBattingTeam();
           }
          );
          AsyncStorage.getItem('tournamentID')
         .then(string=>{
           var trmntid = JSON.parse(string)
           this.setState(
             {tournament_id: trmntid}
             );
            console.log("tournament ID" + this.state.tournament_id);
           }
          );
          AsyncStorage.getItem('match_id')
         .then(string=>{
           var matchid = JSON.parse(string)
           this.setState(
             {match_id: matchid}
             );
            console.log("Match ID" + this.state.match_id);
             this.getBattingTeam();
           }
          );
             
}
getBattingTeam=()=>{
    //console.log(this.state.battingTeam_id);
    var self=this;
 axios.post(global.url+"/api/showselectedplayer",{
    team_id:self.state.battingTeam_id,
    }).then(function(response){
     //onsole.log(response.data.data);
     self.setState({battingSquad:response.data.data});
     self.setState({bflag:response.data.success}); 
     self.getbowlingTeam();       
})
    
}

getbowlingTeam=()=>{
   console.log(this.state.bowlingTeam_id);
    var self=this;
 axios.post(global.url+"/api/showPlayerBowler",{
    team_id:self.state.bowlingTeam_id,
    }).then(function(response){
     console.log(response.data.data);
    self.setState({bowlingSquad:response.data.data});  
    self.storeData();      
})
}

storeData=()=>{
    var self=this;
    axios.post(global.url+"/api/ScoreBoard",{
       team_id:self.state.battingTeam_id,
       tournament_id:self.state.tournament_id,
       match_id:self.state.match_id,
       }).then(function(response){
        console.log(response.data.message);
    }) 
}

saveData=()=>{
    console.log(this.state.selected);
}

score1=()=>{
    var s="1";
    this.setState({score1:s});
    console.log(this.state.score1);
}
score2=()=>{
    var s="2";
    this.setState({score2:s});
    console.log(this.state.score2);
}
score3=()=>{
    var s="3";
    this.setState({score3:s});
    console.log(this.state.score3);
}
four=()=>{
    var s="4";
    this.setState({four:s});
    console.log(this.state.four);
}
six=()=>{
    var s="6";
    this.setState({six:s});
    console.log(this.state.six);
}
wide=()=>{
    var s="1";
    this.setState({wide:s});
    console.log(this.state.wide);
}
noBall=()=>{
    var s="1";
    this.setState({noball:s});
    console.log(this.state.noball);
}
legbye=()=>{
    var s="1";
    this.setState({legbye:s});
    console.log(this.state.legbye);
}
bye=()=>{
    var s="1";
    this.setState({bye:s});
    console.log(this.state.bye);
}
bouncer=()=>{
    var s="1";
    this.setState({bouncer:s});
    console.log(this.state.bouncer);

}


render(){
    var picker_bat1 = this.state.battingSquad.map(battingSquad => {
        return (
          <Picker.Item
            key={battingSquad.get_username.id}
            label={battingSquad.get_username.email}
            value={battingSquad.get_username.id.toString()}
          />
        );
      });
      var picker_bat2 = this.state.battingSquad.map(battingSquad => {
        return (
          <Picker.Item
            key={battingSquad.get_username.id}
            label={battingSquad.get_username.email}
            value={battingSquad.get_username.id.toString()}
          />
        );
      });
      var picker_bowl = this.state.bowlingSquad.map(bowlingSquad => {
        return (
          <Picker.Item
            key={bowlingSquad.get_username.id}
            label={bowlingSquad.get_username.email}
            value={bowlingSquad.get_username.id.toString()}
          />
        );
      });

    return(
            <View style={{flex:1}}>
                <Container  style={{paddingTop:23,backgroundColor:'#154360'}}>    
                    <Header style={{backgroundColor:'#3C7DFE'}} >
                        <Left>
                            <Button transparent  onPress={() => this.props.navigation.navigate('MatchesSchedule')} >
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                        <   Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>Live Scoring</Text>
                        </Body>
                    </Header>
                    <KeyboardAvoidingView styles={{fles:1}} behavior="padding" enabled /> 
                    <Content  >
          <Card >
            <CardItem style={{backgroundColor:"#fff"}} >
              <Body>
              <Label style={{color:"black",fontWeight:'bold'}}>{this.state.bat1.first_name}</Label>
                <TouchableOpacity>
                    <Label style={{color:"black",fontWeight:'bold'}}>{}</Label>
                    </TouchableOpacity>
                    <Input
                    autoCorrect={false}
                   // onChangeText={(text)=>this.setState({address:text})}
                    getRef={f=>(this._inputDesces=f)}
                    blurOnSubmit={true}
                    onSubmitEditing={event=>{
                      this._inputs._root.focus();
                    }}
                    blurOnSubmit={false}
                    />
                <Text>
                </Text>
                <TouchableOpacity>
                    <Label style={{color:"black",fontWeight:'bold'}}>{this.state.bat2.first_name}</Label>
                    </TouchableOpacity>
                    <Input
                    autoCorrect={false}
                   // onChangeText={(text)=>this.setState({password:text})} 
                    getRef={g=>(this._inputs=g)}
                    blurOnSubmit={true}
                    />
                    <View style={{flexDirection:'row'}}>
                <Label style={{color:"black",fontWeight:'bold'}}>Total Score</Label>
                <Label style={{color:"black",fontWeight:'bold',paddingLeft:20}}>Score</Label>
                </View>
                
                <View>
                <Label style={{color:"black",fontWeight:'bold'}}>{this.state.baller.first_name}</Label>
                <Label style={{color:"black",fontWeight:'bold'}}>score</Label>
                </View>
                
                
                <View style={{flexDirection:'row'}}>

                    <Picker
                      style={{ borderColor: "#000", borderWidth: 50 }}
                      selectedValue={this.state.selectedbat1}
                      onValueChange={(value) => this.setState({"selectedbat1": value}, this.batsmanSelection1)}
                    >
                      <Picker.Item label="Batsman 1" value = "0" />
                      {picker_bat1}
                    </Picker>

                    <Picker
                      style={{ borderColor: "#000", borderWidth: 50 }}
                      selectedValue={this.state.selectedbat2}
                      onValueChange={(value) => this.setState({"selectedbat2": value}, this.batsmanSelection2)}
                    >
                      <Picker.Item label="Batsman 2" value = "0" />
                      {picker_bat2}
                    </Picker>

                    <Picker
                      style={{ borderColor: "#000", borderWidth: 50}}
                      selectedValue={this.state.selectedbowl}
                      onValueChange={(value) => this.setState({"selectedbowl": value}, this.bowlerSelection)}
                    >
                      <Picker.Item label="Baller" value = "0"/>
                      {picker_bowl}
                    </Picker>
                </View>

<View style={{flexDirection:'row'}}>
<TouchableOpacity onPress={this.score1}>
<Text>1</Text>
</TouchableOpacity>
<TouchableOpacity onPress={this.score2}>
<Text>2</Text>
</TouchableOpacity>
<TouchableOpacity onPress={this.score3}>
<Text>3</Text>
</TouchableOpacity>
<TouchableOpacity onPress={this.four}>
<Text>4</Text>
</TouchableOpacity>
<TouchableOpacity onPress={this.six}>
<Text>6</Text>
</TouchableOpacity>
<TouchableOpacity onPress={this.wide}>
<Text>Wide</Text>
</TouchableOpacity>
<TouchableOpacity class='button' onPress={this.noBall}>
<Text>No-Ball</Text>
</TouchableOpacity>
<TouchableOpacity onPress={this.legbye}>
<Text>Leg-bye</Text>
</TouchableOpacity>
<TouchableOpacity onPress={this.bye}>
<Text>Bye</Text>
</TouchableOpacity>
<TouchableOpacity onPress={this.bounser}>
<Text>Bouncer</Text>
</TouchableOpacity>
</View>
<Text></Text>
               
              </Body>
            </CardItem>
         </Card>
        </Content>

                </Container>

<Button
                    //primary
                    style={{backgroundColor:'#3C7DFE'}} 
                    block
                    onPress={this.saveData}
                >
                    <Text style={{color: 'white'}}>Add</Text>
                </Button>
            </View>
        );
    }
}

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