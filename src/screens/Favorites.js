import React, {Component} from 'react'
import {Dimensions,Image,AsyncStorage} from 'react-native'
import {Text,Content,Container,List,ListItem,Left, Thumbnail, Body,Right,Button,View,Input}from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {withNavigation} from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HeaderMain from '../components/Headers/HeaderMain'
import { connect } from 'react-redux'
import * as actionWebtoons from '../redux/actions/actionWebtoons'
import * as actionAccount from '../redux/actions/actionAccount'




const {height,width}=Dimensions.get('window')
class Favorites extends Component{
  constructor(){
    super()
    this.state = {
      input : '',
      refresh:1,
      interval : null,
    }
  }

   async componentDidMount(){  
    // const token= await AsyncStorage.getItem('token')
    // if(!token) this.props.navigation.navigate('Account')
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
        this.props.handleGetFavorites({
        id:this.props.loginLocal.login.id
      })
      this.setState(this.state)
    });
  }

  async removeFavorite(webtoonId){
    const token= await AsyncStorage.getItem('token')
    await this.props.handleDeleteFavorite({
        token:String('Bearer '+token),
        userId:this.props.loginLocal.login.id,
        webtoonId:webtoonId
    })
    this.props.handleGetFavorites({
      id:this.props.loginLocal.login.id
    })
    alert('Removed from Favorites')
    this.setState(this.state)
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render(){
    console.log(this.props)
    const {favorites} = this.props.favoritesLocal
    console.log(favorites)
    return(
      <Container>
      <HeaderMain title = 'My Favorites'/>
        <Content>
            <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                <Input onChangeText = {(e)=>this.setState({input : e})}/>
                <TouchableOpacity>
                  <Icon style={{paddingVertical: 10,paddingRight : 10}} name = 'pencil' size={25}></Icon>
                </TouchableOpacity>
            </View>
            {favorites.length >0 ? favorites.map((item,index)=>{
              return(
                <List key = {index}>
                  <ListItem thumbnail onPress = {()=>{this.props.navigation.navigate('Details',{id:item.id, title : item.webtoonData.title, banner : item.webtoonData.image})}}>
                      <Left>
                      <Thumbnail square source={{uri: item.webtoonData.image}}/>
                      </Left>   
                      <Body>
                          <Text>{item.webtoonData.title}</Text>
                          {/* <Text note numberOfLines={1}>{item.webtoonData.title}</Text> */}
                      </Body>
                      <Right style={{flexDirection:'row'}}>
                          <Button danger transparent onPress={()=>this.removeFavorite(item.id_webtoon)}>
                            <Text>Delete</Text>
                          </Button>
                          <Button transparent>
                            <Text>View</Text>
                          </Button>
                        </Right>
                  </ListItem>
                </List>
              )
            }) 
            : 
            <View style={{alignItems:'center',justifyContent:'center',marginTop:height*0.1}}>
            <Image source={require('../assets/mad.gif')}/>
            <Text>No Favorites Yet</Text>
            </View>
          }              
        </Content>
    </Container> 
    )
  }
}

const mapStateToProps = state => {
  return {
      favoritesLocal: state.favorites,
      loginLocal: state.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetFavorites: (params) => dispatch(actionWebtoons.handleGetFavorites(params)),
    handleDeleteFavorite: (params) => dispatch(actionAccount.handleDeleteFavorite(params)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Favorites));