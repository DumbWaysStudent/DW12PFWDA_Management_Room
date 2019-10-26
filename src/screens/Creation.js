import React, {Component} from 'react'
import {AsyncStorage,Text,Content,Container,List,ListItem,Left, Thumbnail, Body,Header,Right,Button,Fab}from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Dummy} from '../components/Dummy'
import HeaderShare from '../components/Headers/HeaderShare'


const data = [...Dummy.data]

class Creation extends Component{
  async componentDidMount(){
    const token= await AsyncStorage.getItem('token')
    if(!token) this.props.navigation.navigate('Account')
  }
  render(){
    return(
      <Container>
        <HeaderShare title = {this.props.navigation.getParam('title')} navigation = {this.props.navigation}/>
        <Content>
        {data.map((item, index) => {
              return (
              <List key = {index}>
                <ListItem thumbnail onPress = {()=>{this.props.navigation.navigate('EditWebtoon',{
                  webtoonTitle : item.title})}}>
                    <Left>
                    <Thumbnail square source={{uri: item.url}}/>
                    </Left>   
                    <Body>
                        <Text>{item.title}</Text>
                        <Text note numberOfLines={1}>{item.caption}</Text>
                    </Body>
                    <Right></Right>
                </ListItem>
              </List>
              )
            })}
        </Content>
        <Fab onPress = {()=>this.props.navigation.navigate('CreateWebtoon')}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight">            
          <Icon name="plus" />
        </Fab>
    </Container> 
    )
  }
}
export default Creation