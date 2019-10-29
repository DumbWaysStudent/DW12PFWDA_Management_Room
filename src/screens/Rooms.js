import React, {Component} from 'react'
import {TouchableOpacity,View,Dimensions,Alert,StyleSheet,Picker} from 'react-native'
import {Text,Container,Button,Label,Input,Fab}from 'native-base'
import Modal from 'react-native-modal'
import {withNavigation} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatGrid } from 'react-native-super-grid';
import * as actionRooms from '../redux/actions/actionRooms'
import * as actionOrders from '../redux/actions/actionOrders'
import { connect } from 'react-redux'


const {height, width } = Dimensions.get('window');
class Rooms extends Component{
    constructor(props){
        super(props)
        this.state = {
            roomId:'',
            customerId:'',
            modal:'',
            roomName:'',
            duration:'',
            disabled:false,
            checkIn:[-1],
        }
    }
    async componentDidMount(){
      const {navigation}=this.props
      const {checkIn}=this.props.checkInLocal
      this.focusListener = navigation.addListener('didFocus',async () => {
        await this.props.handleGetCheckIn({
        token:this.props.loginLocal.login.token
        })
        this.setState(this.state)
      });
      let ci = []
      await checkIn.forEach(item => {
        ci.push(item.id)
      });
      await this.setState({checkIn:ci})
    }
    componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();
    }

    renderRoomModal = () => (
      <View style={styles.content}>
        <Label style = {styles.contentTitle}>Room Name</Label>
        <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
            <Input value={this.state.roomName} onChangeText = {(e)=>this.setState({roomName : e})}/>
        </View>
        <View style = {{flexDirection:'row',justifyContent:'center'}}>
        <Button danger style={{marginHorizontal:10}}
          onPress={() => this.setState({visibleModal: null})}>
        <Text>Cancel</Text>
        </Button>
        {this.state.modal=='add'?
          <Button disabled={this.state.disabled} success style={{marginHorizontal:10}}
          onPress={() => {
            this.addRoom()
          }}>
          <Text>Add</Text>
          </Button>
          :
          <Button disabled={this.state.disabled} warning style={{marginHorizontal:10}}
          onPress={() => {
            this.editRoom()
          }}>
          <Text>Edit</Text>
          </Button>
        }
        </View>
      </View>
    )
    
    renderCheck = () => (
      <View style={styles.content}>
        <Label style = {styles.contentTitle}>Room Name</Label>
        <View style = {{flexDirection : 'row',borderWidth : 2, width: width*0.7, marginHorizontal : 90}}>
            <Input disabled={true} value={this.state.roomName} onChangeText = {(e)=>this.setState({roomName : e})}/>
        </View>
        <Label style = {styles.contentTitle}>Customer</Label>
        <View style = {{borderWidth:2,height:50, width: width*0.7}}>
          <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: width*0.7}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue,customerId:item.id})
            }>
            {this.props.customersLocal.customers.map((item,index)=>{
              return(<Picker.Item label={`${item.name} - ${item.phone_number}`} value={item.name} />
              )
            })}
          </Picker>
        </View>
        <Label style = {styles.contentTitle}>Duration (minutes)</Label>
        <View style = {{flexDirection : 'row', width: width*0.7,borderWidth : 2, marginHorizontal : 90,marginBottom:10}}>
            <Input value={this.state.duration} onChangeText = {(e)=>this.setState({duration : e})}/>
        </View>
        <View style = {{flexDirection:'row',justifyContent:'center'}}>
        <Button danger style={styles.Button}
          onPress={() => this.setState({visibleModal: null,roomName:''})}>
        <Text>Cancel</Text>
        </Button>
        {this.state.modal=='checkIn'?
          <Button disabled={this.state.disabled} success style={styles.Button}
          onPress={() => {
            this.checkIn()
          }}>
          <Icon style={{marginLeft:10}} name='check' color='white'></Icon>
          <Text>Check In</Text>
          </Button>
          :
          <Button disabled={this.state.disabled} success style={styles.Button}
          onPress={() => {
          console.log('checkout')
          }}>
          <Icon style={{marginLeft:10}} name='check' color='white'></Icon>
          <Text>Check Out</Text>
          </Button>
        }
        </View>
      </View>
    )

    async editRoom(){
      this.setState({disabled:!this.state.disabled})
      await this.props.handleEditRoom({
        roomId:this.state.roomId,
        roomName:this.state.roomName,
        token:this.props.loginLocal.login.token
      })
      await this.props.handleGetRooms({
        token:this.props.loginLocal.login.token
      })
      this.setState(this.state)
      Alert.alert(
        'Edit Room Success',
        `by : ${this.props.loginLocal.login.email}`,
        [
            {text: 'Ok', onPress: () => this.setState({visibleModal: null,disabled:!this.state.disabled,roomName:''})},
        ],
        {cancelable: false},
        )
    }
    async checkIn(){
      this.setState({disabled:!this.state.disabled})
      await this.props.handleAddorder({
        roomId:this.state.roomId,
        customerId:this.state.customerId,
        duration:this.state.customerId,
        token:this.props.loginLocal.login.token
      })
      await this.props.handleGetRooms({
        token:this.props.loginLocal.login.token
      })
      this.setState(this.state)
      Alert.alert(
        'Add Room Success',
        `by : ${this.props.loginLocal.login.email}`,
        [
            {text: 'Yay', onPress: () => this.setState({visibleModal: null,disabled:!this.state.disabled})},
        ],
        {cancelable: false},
        )
    }
    async addRoom(){
      this.setState({disabled:!this.state.disabled})
      await this.props.handleAddRoom({
        roomName:this.state.roomName,
        token:this.props.loginLocal.login.token
      })
      await this.props.handleGetRooms({
        token:this.props.loginLocal.login.token
      })
      this.setState(this.state)
      Alert.alert(
        'Add Room Success',
        `by : ${this.props.loginLocal.login.email}`,
        [
            {text: 'Yay', onPress: () => this.setState({visibleModal: null,disabled:!this.state.disabled})},
        ],
        {cancelable: false},
        )
    }
    render(){
      const {rooms} = this.props.roomsLocal
      return (
        <Container>
          <Modal
          isVisible={this.state.visibleModal === 'swipeable'}
          backdropColor="#B4B3DB"
          animationInTiming={500}
          animationOutTiming={500}
          onSwipeComplete={() => this.setState({visibleModal: null})}
          swipeDirection={['up', 'left', 'right', 'down']}>
          {this.state.modal=='add'||this.state.modal=='edit'?
            this.renderRoomModal()
          :
          this.renderCheck()
          }
        </Modal>
          <FlatGrid
          itemDimension={width*0.2}
          items={rooms}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
            onPress={()=>
              this.state.checkIn.filter(e=>e==item.id)=='' ?
              this.setState({
              visibleModal: 'swipeable',
              roomName:item.name,
              modal:'checkIn',
              roomId:item.id
              })
              :
              this.setState({
                visibleModal: 'swipeable',
                roomName:item.name,
                modal:'checkOut',
                roomId:item.id
                })
             } 
            delayLongPress={100}
            onLongPress={()=>   
              this.setState({
                visibleModal: 'swipeable',
                modal:'edit',
                roomName:item.name,
                roomId:item.id
                })
              } 
            >
              <View style={[styles.itemContainer, {
                backgroundColor: 
                this.state.checkIn.filter(e=>e==item.id)=='' ?'grey':'green' }]}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            </TouchableOpacity>
          )}
          
        />

        <Fab onPress = {()=> this.setState({visibleModal: 'swipeable',modal:'add'})}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight">            
          <Icon name="plus" />
        </Fab>    
        </Container>
      );
      
  }
}
const mapStateToProps = state => {
  return {
    loginLocal: state.login,
    checkInLocal: state.checkIn,
    roomsLocal: state.rooms,
    customersLocal:state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddOrder: (params) => dispatch(actionOrders.handleAddOrder(params)),
    handleAddRoom: (params) => dispatch(actionRooms.handleAddRoom(params)),
    handleGetRooms: (params) => dispatch(actionRooms.handleGetRooms(params)),   
    handleGetCheckIn: (params) => dispatch(actionRooms.handleGetCheckIn(params)),
    handleEditRoom: (params) => dispatch(actionRooms.handleEditRoom(params))      
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Rooms));

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: height*0.1,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 14,
  },
  Button:{
    marginHorizontal:10,
    borderRadius:50,
    borderWidth:2,
    borderColor:'black'
  }
});
 