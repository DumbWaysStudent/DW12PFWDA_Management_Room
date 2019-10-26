import React from 'react'
import {Header,Left,Right,Body,Button,Input}from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {StyleSheet,View,Dimensions} from 'react-native'

const {height, width } = Dimensions.get('window');

const HeaderHome = () => {
  return(
  <Header transparent>
      <Left>
        <Button transparent>
          <Icon size = {25} name='bars' />
        </Button>
      </Left>
      <Body>
        <View style = {styles.header}>
        <Input placeholder = 'Search' ></Input>
        </View>
      </Body>
      <Right>
        <Button transparent>
        <Icon size = {20} name='search' />
        </Button>
        <Button transparent>
          <Icon  size = {25}name='ellipsis-v' />
        </Button>
      </Right>
  </Header>)
}

export default HeaderHome
const styles = StyleSheet.create({
  header : {
    borderWidth : 2,
    borderRadius : 50,width : width*0.72,height :height*0.07
  } 
})