import React, {Component} from 'react'
import {Dimensions,Image,View,AsyncStorage} from 'react-native'
import {Content,Container,List,ListItem,Left, Thumbnail, Body,Text}from 'native-base'
import HeaderShare from '../components/Headers/HeaderShare'
import { connect } from 'react-redux'

const {height,width} = Dimensions.get('window')

class Details extends Component{  
  async componentDidMount(){
    const token= await AsyncStorage.getItem('token')
    if(!token) this.props.navigation.navigate('Account')
  }
    render(){
    const id = this.props.navigation.getParam('id')
    const episodes = this.props.episodesLocal.episodes.filter(item=>item.id_webtoon==id).reverse()
    const webtoonTitle = this.props.navigation.getParam('title')
        return(
            <Container>
                <HeaderShare title = {webtoonTitle} navigation = {this.props.navigation}/>
              <Content>
                  <Image style = {{height : height*0.3,width}} source ={{uri :this.props.navigation.getParam('banner')}}></Image>
                  {episodes.length!==0 ? 
                  episodes.map((item,index)=>{
                    return (
                      <List key = {index}>
                        <ListItem thumbnail onPress = {()=>this.props.navigation.navigate('Episode',{ 
                          title : `${webtoonTitle} Ep ${item.episode}`,
                          id_webtoon:item.id_webtoon,
                          episode:item.episode
                          })}>
                            <Left>
                            <Thumbnail square source={{uri: item.image}}/>
                            </Left>   
                            <Body>
                                <Text>Episode {item.episode}</Text>
                                <Text note numberOfLines = {1}>{item.title}</Text>
                            </Body> 
                        </ListItem>
                      </List>
                      )
                  })
                  :
                  <View style={{alignItems:'center',justifyContent:'center',marginTop:height*0.1}}>
                    <Image style={{height:height*0.2,width:width*0.3}} source={require('../assets/noepisode.gif')}/>
                    <Text>Coming Soon</Text>
                    </View>
                  }
              </Content>
            </Container>   
                  
        )
    }
}
const mapStateToProps = state => {
    return {
      episodesLocal: state.episodes
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details);