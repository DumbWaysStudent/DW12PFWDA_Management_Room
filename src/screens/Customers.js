import React, {Component} from 'react'
import {Dimensions,Image,AsyncStorage,Modal,Alert} from 'react-native'
import {Text,Content,Container,List,ListItem,Left, Thumbnail, Body,Right,Button,View,Fab,Label,Input}from 'native-base'
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
      name:'',
      idNumber:'',
      phoneNumber:'',
      modalVisible: false,
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
  async addCustomer(){
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
          {text: 'Yay', onPress: () =>this.setModalVisible(!this.state.modalVisible)},
      ],
      {cancelable: false},
      )
  }

  render(){
    const {customers}=this.props.customersLocal
    console.log(this.props.customersLocal)
    return(
      <Container>
      <HeaderMain title = 'Customers'/>
        <Content>
          
        {customers.length >0 ? customers.map((item,index)=>{
              return(
                <List key = {index}>
                  <ListItem thumbnail onPress = {()=>this.props.navigation.navigate('EditCustomer',{
                    id:item.id,
                    name:item.name,
                    idNumber:item.identity_number,
                    phoneNumber:item.phone_number
                  })}>
                      <Left>
                      <Thumbnail square source={{uri: 'https://vignette.wikia.nocookie.net/spongebob/images/f/f2/Oldbash.jpg/revision/latest?cb=20170724203516'}}/>
                      </Left>   
                      <Body>
                          <Text>{item.name}</Text>
                          <Text note numberOfLines={1}>{item.identity_number}</Text>
                          <Text note numberOfLines={2}>{item.phone_number}</Text>
                      </Body>
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

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Label>Name</Label>
              <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                  <Input onChangeText = {(e)=>this.setState({name : e})}/>
              </View>
              <Label>ID Number</Label>
              <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                  <Input onChangeText = {(e)=>this.setState({idNumber : e})}/>
              </View>
              <Label>Phone Number</Label>
              <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                  <Input onChangeText = {(e)=>this.setState({phoneNumber : e})}/>
              </View>
              <View style = {{flexDirection:'row',justifyContent:'center'}}>
              <Button transparent block
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Cancel</Text>
              </Button>
              <Button transparent block
                onPress={() => {
                  this.addCustomer()
                }}>
                <Text>Add</Text>
              </Button>
              </View>

            </View>
          </View>
        </Modal>

        <Fab onPress = {()=>this.setModalVisible(true)}
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
    handleAddCustomer: (params) => dispatch(actionCustomers.handleAddCustomer(params)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Customers));