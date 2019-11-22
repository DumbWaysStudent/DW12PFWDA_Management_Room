import React, {Component} from 'react'
import {Dimensions,Image,StyleSheet,Alert,ImageBackground} from 'react-native'
import {Text,Content,Container,List,ListItem,Left, Thumbnail, Body,Right,Button,View,Fab,Label,Input}from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {withNavigation} from 'react-navigation'
import Modal from 'react-native-modal'
import HeaderMain from '../components/Headers/HeaderMain'
import { connect } from 'react-redux'
import * as actionCustomers from '../redux/actions/actionCustomers'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-picker';




const {height,width}=Dimensions.get('window')
class Customers extends Component{
  constructor(){
    super()
    this.state = {
      customerId:'',
      modal:'',
      name:'',
      imageUrl:'',
      idNumber:'',
      phoneNumber:'',
      disabled:false,

    }
  }

   async componentDidMount(){  
    // const token= await AsyncStorage.getItem('token')
    // if(!token) this.props.navigation.navigate('Account')
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({})
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  openCamera(){
    this.setState({visibleModal:null})
    this.handlerCamera()
  }
  handlerCamera() {
    const options = {
        title: 'Select Image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
      } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
      } else {
          const source =response.uri ;
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
              visibleModal:'swipeable',
              imageUrl: source
          });
      }
    });
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
      <Label>Image</Label>
      <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
          <Input disabled={true} value={this.state.imageUrl}/>
          <Icon style={{marginVertical: width*0.03,marginRight : width*0.03}} color="#0394fc" name = 'camera'
          size={25} onPress = {()=>this.openCamera()}></Icon>       
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
      image:this.state.imageUrl,
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
            phoneNumber:'',
            imageUrl:''
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
      image:this.state.imageUrl,
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
    const {customers}=this.props.customersLocal
    return(
      <Container>
      <ImageBackground source = {require('../assets/background.jpg')} style={{width,height}} >
      <HeaderMain title = 'Customers' navigation = {this.props.navigation}/>
      <Content>
        {customers.length >0 ? customers.map((item,index)=>{
              return(
                <List key = {index}>
                  <ListItem thumbnail onPress = {()=>this.setState({
                    visibleModal: 'swipeable',
                    modal:'edit',
                    customerId:item.id,
                    name:item.name,
                    idNumber:item.identity_number,
                    phoneNumber:item.phone_number,
                    imageUrl:item.image
                    })}>
                      <Left>
                      <Thumbnail square source={{uri:item.image}}/>
                      </Left>   
                      <Body>
                          <Text>{item.name}</Text>
                          <Text note numberOfLines={1}>ID Number : {item.identity_number}</Text>
                          <Text note numberOfLines={2}>Phone : {item.phone_number}</Text>
                      </Body>
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
      </ImageBackground>
      <Modal
        onBackdropPress={()=>this.setState({visibleModal: null,name:'',idNumber:'',phoneNumber:'',imageUrl:''})}
        isVisible={this.state.visibleModal === 'swipeable'}
        backdropColor="#B4B3DB"
        animationInTiming={500}
        animationOutTiming={500}
        onSwipeComplete={() => this.setState({visibleModal: null,name:'',idNumber:'',phoneNumber:'',imageUrl:''})}
        swipeDirection={['up', 'left', 'right', 'down']}>
        {this.renderModal()}
      </Modal>
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
)(withNavigation(Customers));

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
 