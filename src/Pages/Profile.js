import React, { Component } from 'react';
import { AsyncStorage,View , StyleSheet,Dimensions,ImageBackground,Text,Image} from 'react-native';
import {Form,Icon, Item, Label, Input,Button,Container,Left,Right,Header, Content, Card, CardItem, Body } from 'native-base';

import { Avatar } from 'react-native-elements';
import axios from 'axios';

var myBackground = require('../assets/icons/profile_img1.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class Setting extends React.Component{
    static navigationOptions = {
        header: null
     }
     
     constructor(props){
        super(props)
        this.state={
          count:0,
        player_name:'',
        player_num:'',
        numof_six:'',
        numof_four:'',
        numof_dots:'',
        user:[],
        }
        this.getData();
    }
    
    toggleDrawer = () => {
      //Props to open/close the drawer
      this.props.navigation.toggleDrawer();
      
    };

    getData = () => {
      try {
        AsyncStorage.getItem('userlogin')
        .then(string=>{
          console.log(string);
          this.setState(
            {user: JSON.parse(string)}
            )
          }
         )
        
      } catch(e) {
        // error reading value
      }
    }

    updateProfile=()=>{
      var self=this;
    axios.post(global.url+"/api/profileStore",{
      user_id:self.state.user.id,
      player_name:self.state.player_name,
      player_num:self.state.player_num,
      num_six:self.state.numof_six,
      num_four:self.state.numof_four,
      num_dots:self.state.numof_dots,
    }).then(function(response){
    console.log(response);
      self.props.navigation.navigate('MainPage');
    
    }).catch(function(error){
      console.log(error);
    })
    }


render(){
  
    return(
        <View style={styles.wholecontainer}>
          <Container style={{paddingTop:23,backgroundColor:'#154360'}}>
            {/* <ImageBackground source={myBackground} style={styles.backgroundImage}> */}
              <Header style={{backgroundColor:'#3C7DFE'}}>
                <Left>
                    <Button
                      transparent
                      onPress={this.toggleDrawer.bind(this)}>
                      <Icon name="menu" />
                    </Button>
                </Left>
              <Body>
                  <Text style={{color:'#fff',fontWeight:'bold',fontSize:20,paddingLeft:'10%',paddingRight:'10%'}}>Profile Update</Text>
              </Body></Header>

              <View style={styles.container}>
                <View style={styles.viewContainer}>
                  <Avatar
                    size="xlarge"
                    source={{
                    uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                    //onPress={() => console.log("Works!")}
                    showEditButton
                    editButton={{ onPress: () => console.log('hey') }}
                    
                  />
                </View>
                <View style={styles.viewContainer}>
                  <Text>{this.state.user.email}</Text>
                  <Text>USER NAME</Text>
                  <Text>CONTACT NUMBER</Text>
                </View>
              </View>

          <Content style={{paddingBottom:'40%'}} >
            <Card borderRadius={20}>
              <CardItem style={{backgroundColor:""}} >
                <Body>
                  <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Enter Player Nick Name</Label>
                      <Input
                      autoCorrect={false}  
                      onChangeText={(text)=>this.setState({player_name:text})}                    
                      />
                  </Item>
                  <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>Enter Player Number</Label>
                      <Input
                      autoCorrect={false}
                      onChangeText={(text)=>this.setState({player_num:text})}                      
                      />
                  </Item>
                  <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>No. of SIX's</Label>
                      <Input
                      autoCorrect={false} 
                      onChangeText={(text)=>this.setState({numof_six:text})}                     
                      />
                  </Item>
                  <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>No. of FOUR's</Label>
                      <Input
                      autoCorrect={false}                      
                      onChangeText={(text)=>this.setState({numof_four:text})}
                      />
                  </Item>
                  <Item floatingLabel>
                    <Label style={{color:"black",fontWeight:'bold'}}>No. of DOTS ball</Label>
                      <Input
                      autoCorrect={false} 
                      onChangeText={(text)=>this.setState({numof_dots:text})}                     
                      />
                  </Item>

                  <Text></Text>

                  <Button
                     // primary
                     style={{backgroundColor:'#3C7DFE'}}
                      block
                      onPress={this.updateProfile}
                  >
                    <Text style={{color: 'white'}}>Create New Record</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Content>
        {/* </ImageBackground> */}
      </Container>
    </View>
);}}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      width: width,
      height: height
    }, 
    container: {
      flex: 1,
      flexDirection: 'row', 
      paddingTop:'5%', 
      
           
    },
    wholecontainer:{
      flex: 1,
      backgroundColor:'#154360'
    },
    viewContainer: {
      flex: 1,
      paddingRight:10,
      paddingLeft:10,
      height:160,
      borderColor: 'rgb(169, 50, 38)',
      backgroundColor:'#fff',      
    },
  });

export default Setting;