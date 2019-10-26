import React, {Component} from 'react'
import {Dimensions,Image,AsyncStorage} from 'react-native'
import {Text,Content,Container,List,ListItem,Left, Thumbnail, Body,Right,Button,View,Fab}from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {withNavigation} from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HeaderMain from '../components/Headers/HeaderMain'
import { connect } from 'react-redux'
import * as actionCustomers from '../redux/actions/actionCustomers'




const {height,width}=Dimensions.get('window')
class Customers extends Component{
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
        this.props.handleGetCustomers({
            token:this.props.loginLocal.login.token
        })
      this.setState(this.state)
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render(){
    console.log(this.props.customersLocal)
    return(
      <Container>
      <HeaderMain title = 'Customers'/>
        <Content>
          
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

const mapStateToProps = state => {
  return {
      customersLocal: state.customers,
      loginLocal: state.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetCustomers: (params) => dispatch(actionCustomers.handleGetCustomers(params)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Customers));