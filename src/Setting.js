import React, { Component } from 'react';
import { View ,ImageBackground,Text, Dimensions, StyleSheet} from 'react-native';
import { Container, Body} from 'native-base';
import { Header, Left,  Right, Button, Icon,Item,Input} from 'native-base';


var myBackground = require('../assets/icons/setting_img.png');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class Setting extends React.Component{
    static navigationOptions = {
        header: null
     }
     toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigation.toggleDrawer();
        
      };

    render(){
        return(
            <View style={styles.container}>
                <Container style={{paddingTop:23}}>
                    <ImageBackground source={myBackground} style={styles.backgroundImage}>
                        <Header rounded 
                        style={{ backgroundColor: 'blue' }}
                        >
                            <Left>
                            <Button
                              transparent
                              onPress={this.toggleDrawer.bind(this)}>
                              <Icon name="menu" />
                            </Button>
                            </Left>
                            <Body>
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:25,paddingLeft:10,paddingRight:25 }}>SETTING</Text>
                        </Body>
                            <Right>
                            <Button transparent  onPress={() => this.props.navigation.navigate('MainPage')} >
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Done</Text>
                            </Button>
                            </Right>
                        </Header>
                        </ImageBackground>
                </Container>                
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: width,
        height: height
    }, 
  });

export default Setting;