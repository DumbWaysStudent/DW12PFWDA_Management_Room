import React, {Component} from 'react'
import {Dimensions,Image,StyleSheet,ImageBackground} from 'react-native'
import {Text,Content,Container,List,ListItem,Left, Thumbnail, Body,Right,Button,View,Fab,Label,Input}from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {withNavigation} from 'react-navigation'
import Modal from 'react-native-modal'
import HeaderMain from '../components/Headers/HeaderMain'
import { connect } from 'react-redux'
import * as actionOrders from '../redux/actions/actionOrders'




const {height,width}=Dimensions.get('window')
class Orders extends Component{
  constructor(){
    super()
    this.state = {
    }
  }

   async componentDidMount(){  
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', async () => {
      this.ordersChecker()
      this.setState({})
    });
    this.interval = setInterval(async () => await this.setState({}) , 5000)
    
  }
  componentWillUnmount() {
    // Remove the event listener
    clearInterval(this.interval)
    this.focusListener.remove();
  }

  async ordersChecker() {
    await this.props.handleGetOrders({
      token:this.props.loginLocal.login.token
  })
  this.setState({})
  }

  convertDate(data){
    const date = new Date(data)
    return date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+' : '+date.getHours()+':'+date.getMinutes()
  }
  render(){
    const {orders}=this.props.ordersLocal
    return(
      <Container>
        <ImageBackground source = {require('../assets/background.jpg')} style={{width,height}} >
        <HeaderMain title = 'Orders'/>
        <Content>
        {orders.length >0 ? 
        orders.map((item,index)=>{
              return(
                <List key = {index}>
                  <ListItem avatar>  
                  <Left>
                    <Thumbnail square source={{ uri: item.customer.image }} />
                  </Left>
                      <Body>
                          <Text>Invoice #POL0{item.id}</Text>
                          <Text note numberOfLines={1}>Table : {item.table.name}</Text>
                          <Text note numberOfLines={2}>Customer : {item.customer.name}</Text>
                          <Text note numberOfLines={3}>Duration : {item.duration} minutes</Text>
                          <Text note numberOfLines={2}>Ends At : {this.convertDate(item.order_end_time)}</Text>
                      </Body>
                      <Right>
                        <Text note>{this.convertDate(item.createdAt)}</Text>
                        <View style = {{
                          borderWidth:2,
                          borderRadius:10,
                          borderColor:item.is_done==false?'#c9b332':'#37bf2e',
                          width:width*0.2,
                          alignItems:'center'}}>
                          <Text style = {{color:item.is_done==false?'#c9b332':'#37bf2e',fontSize:12}} note>
                            {item.is_done==false?'In Progress':'Completed'}
                          </Text>
                          </View>
                      </Right>
                  </ListItem>
                </List>
              )
            }) 
            : 
            <View style={{alignItems:'center',justifyContent:'center',marginTop:height*0.1}}>
            <Image source={require('../assets/load.gif')} style={{height:height*0.2,width:width*0.5}}/>
            <Text>Loading...</Text>
            </View>
          }         
        </Content>
                </ImageBackground>
      
    </Container> 
    )
  }
}

const mapStateToProps = state => {
  return {
      customersLocal: state.customers,
      loginLocal: state.login,
      ordersLocal: state.orders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetOrders: (params) => dispatch(actionOrders.handleGetOrders(params)),     
    handleGetCustomers: (params) => dispatch(actionCustomers.handleGetCustomers(params)),
    handleAddCustomer: (params) => dispatch(actionCustomers.handleAddCustomer(params)),
    handleEditCustomer: (params) => dispatch(actionCustomers.handleEditCustomer(params))     
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Orders));

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
 