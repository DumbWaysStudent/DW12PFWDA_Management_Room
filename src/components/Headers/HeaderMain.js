import React from 'react'
import {Header,Left,Right,Body,Button,Input,Text}from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {StyleSheet,Dimensions,Share} from 'react-native'

const {height, width } = Dimensions.get('window');

const shareOptions ={
    title: 'Polley',
    message: "Polley is Here !!!", // Note that according to the documentation at least one of "message" or "url" fields is required
    // url: 'www.example.com',
    subject: 'Polley App'
  }
onSharePress = () => Share.share(shareOptions);
const HeaderMain = (props) => {
  return(
  <Header transparent>
      <Left>
        <Button transparent>
          <Icon size = {25} name='bars' onPress={()=>props.navigation.toggleDrawer()} />
        </Button>
      </Left>
      <Body>
        <Text>{props.title}</Text>
      </Body>
      <Right>
        <Button transparent onPress={()=>onSharePress()}>
          <Icon  size = {25}name='share-alt' color = '#0388fc'/>
        </Button>
      </Right>
  </Header>)
}

export default HeaderMain
const styles = StyleSheet.create({
  header : {
    borderWidth : 2,
    borderRadius : 50,width : width*0.72,height :height*0.07
  } 
})


