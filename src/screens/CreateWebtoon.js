import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import {View,Text,Content,Container,ListItem,Left, Thumbnail, Body,Right,Button, Label,Input,List}from 'native-base'
import HeaderShare from '../components/Headers/HeaderShare'
import {Dummy} from '../components/Dummy'


const data = [...Dummy.data]

class CreateWebtoon extends Component{

  async componentDidMount(){
    const token= await AsyncStorage.getItem('token')
    if(!token) this.props.navigation.navigate('Account')
  }
  renderRecent = ({item,index}) => {
    return(
        <ListItem thumbnail onPress = {()=>{this.props.navigation.navigate('Details',{id : index})}}>
            <Left>
            <Thumbnail square source={{uri: item.url}}/>
            </Left>   
            <Body>
                <Text>{item.title}</Text>
                <Text note numberOfLines={1}>{item.caption}</Text>
            </Body>
            <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
        </ListItem>
    )
  }
  render(){
    return(
      <Container>
      <HeaderShare title = 'Create Webtoon' navigation = {this.props.navigation}/>

        <Content>
            <Label style = {{marginLeft :20}}>Title</Label>
            <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                <Input value = {this.props.navigation.getParam('title')}/>
            </View>
            {data.map((item, index) => {
              return (
                <List key = {index}>
                <ListItem thumbnail>
                    <Left>
                    <Thumbnail square source={{uri: item.url}}/>
                    </Left>   
                    <Body>
                        <Text>{item.title}</Text>
                        <Text note numberOfLines={1}>{item.caption}</Text>
                    </Body>
                    <Right>
                        <Button transparent></Button>
                      </Right>
                </ListItem>
              </List>
              )
            })}
            <Button  transparent style = {{color : 'black', marginBottom : 20,marginHorizontal : 80,borderWidth : 2,borderColor : 'black'}}block bordered><Text style = {{color : 'black'}}>Create Webtoon</Text></Button>  
        </Content>
    </Container> 
    )
  }
}
export default CreateWebtoon