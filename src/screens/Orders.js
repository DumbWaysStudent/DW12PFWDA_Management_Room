import React, {Component} from 'react'
import {Dimensions,Image,StyleSheet,Alert} from 'react-native'
import {Text,Content,Container,List,ListItem,Left, Thumbnail, Body,Right,Button,View,Fab,Label,Input}from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {withNavigation} from 'react-navigation'
import Modal from 'react-native-modal'
import HeaderMain from '../components/Headers/HeaderMain'
import { connect } from 'react-redux'
import * as actionCustomers from '../redux/actions/actionCustomers'




const {height,width}=Dimensions.get('window')
class Orders extends Component{
  constructor(){
    super()
    this.state = {
      customerId:'',
      modal:'',
      name:'',
      idNumber:'',
      phoneNumber:'',
      modalVisible: false,
      disabled:false,

    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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

  renderModal = () => (
    <View style={styles.content}>
      <Label>Name</Label>
      <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
          <Input value={this.state.name} onChangeText = {(e)=>this.setState({name : e})}/>
      </View>
      <Label>ID Number</Label>
      <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
          <Input value={this.state.idNumber} onChangeText = {(e)=>this.setState({idNumber : e})}/>
      </View>
      <Label>Phone Number</Label>
      <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
          <Input value={this.state.phoneNumber} onChangeText = {(e)=>this.setState({phoneNumber : e})}/>
      </View>
      <View style = {{flexDirection:'row',justifyContent:'center'}}>
      <Button danger style={{marginHorizontal:10}}
        onPress={() => this.setState({visibleModal: null})}>
      <Text>Cancel</Text>
      </Button>
      {this.state.modal=='add'?
        <Button disabled={this.state.disabled} success style={{marginHorizontal:10}}
        onPress={() => {
          this.addCustomer()
        }}>
        <Text>Add</Text>
        </Button>
        :
        <Button disabled={this.state.disabled} warning style={{marginHorizontal:10}}
        onPress={() => {
          this.editCustomer()
        }}>
        <Text>Edit</Text>
        </Button>
    }
      </View>
    </View>
  )

  async addCustomer(){
    this.setState({disabled:!this.state.disabled})
    await this.props.handleAddCustomer({
      name:this.state.name,
      idNumber:this.state.idNumber,
      phoneNumber:this.state.phoneNumber,
      token:this.props.loginLocal.login.token
    })
    await this.props.handleGetCustomers({
      token:this.props.loginLocal.login.token
    })
    this.setState(this.state)
    Alert.alert(
      'Add Customer Success',
      `by : ${this.props.loginLocal.login.email}`,
      [
          {text: 'Yay', onPress: () => this.setState({
            visibleModal: null,
            disabled:!this.state.disabled,
            name:'',
            idNumber:'',
            phoneNumber:''
          })},
      ],
      {cancelable: false},
      )
  }

  async editCustomer(){
    this.setState({disabled:!this.state.disabled})
    await this.props.handleEditCustomer({
      id:this.state.customerId,
      name:this.state.name,
      idNumber:this.state.idNumber,
      phoneNumber:this.state.phoneNumber,
      token:this.props.loginLocal.login.token
    })
    await this.props.handleGetCustomers({
      token:this.props.loginLocal.login.token
    })
    this.setState(this.state)
    Alert.alert(
      'Edit Customer Success',
      `by : ${this.props.loginLocal.login.email}`,
      [
          {text: 'Ok', onPress: () => this.setState({
            visibleModal: null,
            disabled:!this.state.disabled,
            name:'',
            idNumber:'',
            phoneNumber:''
          })},
      ],
      {cancelable: false},
      )
  }
  render(){
    const {orders}=this.props.ordersLocal
    return(
      <Container>
      <HeaderMain title = 'Orders'/>
      <Modal
        isVisible={this.state.visibleModal === 'swipeable'}
        backdropColor="#B4B3DB"
        animationInTiming={500}
        animationOutTiming={500}
        onSwipeComplete={() => this.setState({visibleModal: null})}
        swipeDirection={['up', 'left', 'right', 'down']}>
        {this.renderModal()}
      </Modal>
        <Content>
        {orders.length >0 ? 
        orders.map((item,index)=>{
              return(
                <List key = {index}>
                  <ListItem avatar onPress = {()=>this.setState({
                    visibleModal: 'swipeable',
                    modal:'edit',
                    orderId:item.id,
                    name:item.name,
                    idNumber:item.identity_number,
                    phoneNumber:item.phone_number
                    })}>
                      <Left>
                      <Text>Order # {item.id}</Text>
                      </Left>   
                      <Body>
                          <Text>Order # {item.id}</Text>
                          <Text note numberOfLines={1}>ID Number : {item.identity_number}</Text>
                          <Text note numberOfLines={2}>Phone : {item.phone_number}</Text>
                      </Body>
                      <Right>
                        <Text note>{item.createdAt}</Text>
                        <View style = {{
                          borderWidth:2,
                          borderRadius:10,
                          borderColor:item.is_done==false?'#c9b332':'#37bf2e',
                          width:width*0.3,
                          alignItems:'center'}}><Text style = {{color:item.is_done==false?'#c9b332':'#37bf2e'}} note>{item.is_done==false?'In Progress':'Completed'}</Text></View>
                      </Right>
                  </ListItem>
                </List>
              )
            }) 
            : 
            <View style={{alignItems:'center',justifyContent:'center',marginTop:height*0.1}}>
            <Image source={require('../assets/load.gif')}/>
            <Text>Loading ...</Text>
            </View>
          }         
        </Content>

        <Fab onPress = {()=> this.setState({
            visibleModal: 'swipeable',
            modal:'add',           
            name:'',
            idNumber:'',
            phoneNumber:''})}
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
      ordersLocal: state.orders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
 