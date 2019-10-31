import React, { Component } from 'react'
import { TouchableOpacity, View, Dimensions, Alert, StyleSheet, Picker, AsyncStorage } from 'react-native'
import { Text, Container, Button, Label, Input, Fab } from 'native-base'
import Modal from 'react-native-modal'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatGrid } from 'react-native-super-grid';
import * as actionRooms from '../redux/actions/actionRooms'
import * as actionOrders from '../redux/actions/actionOrders'
import { connect } from 'react-redux'
import moment from 'moment'

const { height, width } = Dimensions.get('window');

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomId: '',
      orderId:'',
      customerId: 1,
      modal: '',
      roomName: '',
      duration: '',
      disabled: false,
      queues:'',
      timer:''
    }
  }
  async componentDidMount() {
    const { navigation } = this.props
    this.focusListener = navigation.addListener('didFocus', async () => {
      await this.ordersChecker()
    })
    await this.ordersChecker()
    this.interval = setInterval(async () => await this.ordersChecker() , 5000)
    await this.roomChecker()
  }
  componentWillUnmount() {
    // Remove the event listener
    clearInterval(this.interval)
    this.focusListener.remove();
  }
  async ordersChecker() {
    await this.props.handleGetQueues({
      token: this.props.loginLocal.login.token
    })
    let {queues} = this.props.ordersLocal
    let newQ=[]
    queues.forEach(item => {
      newQ.push({
        id:item.id,
        room_id:item.room_id,
        order_end_time:moment(item.order_end_time).diff(moment(),'seconds')
      })
    })
    queues=newQ
    this.props.ordersLocal.queues=newQ
    await this.setState({timer:newQ[0]})
    while (this.state.timer) {
      if(this.state.timer.order_end_time<=0) await this.checkOut(this.state.timer.id)
      else return 0
    }
   }
  async roomChecker() {
    await this.props.handleGetRooms({
      token: this.props.loginLocal.login.token
    })
    this.setState(this.state)
  }
  timer(){

  }
  renderRoomModal = () => (
    <View style={styles.content}>
      <Label style={styles.contentTitle}>Room Name</Label>
      <View style={{ flexDirection: 'row', borderWidth: 2, marginHorizontal: 40, marginVertical: 10 }}>
        <Input value={this.state.roomName} onChangeText={(e) => this.setState({ roomName: e })} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button danger style={{ marginHorizontal: 10 }}
          onPress={() => this.setState({ visibleModal: null ,disabled:!this.state.disabled})}>
          <Text>Cancel</Text>
        </Button>
        {this.state.modal == 'add' ?
          <Button disabled={this.state.disabled} success style={{ marginHorizontal: 10 }}
            onPress={() => {
              this.addRoom()
            }}>
            <Text>Add</Text>
          </Button>
          :
          <Button disabled={this.state.disabled} warning style={{ marginHorizontal: 10 }}
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
      <Label style={styles.contentTitle}>Room Name</Label>
      <View style={{ flexDirection: 'row', borderWidth: 2, width: width * 0.7, marginHorizontal: 90 }}>
        <Input
        backgroundColor={this.state.modal == 'checkIn' ? 'white' : 'grey'}
        disabled={true} value={this.state.roomName} onChangeText={(e) => this.setState({ roomName: e })} />
      </View>
      <Label style={styles.contentTitle}>Customer</Label>
      <View
        backgroundColor={this.state.modal == 'checkIn' ? 'white' : 'grey'}
        style={{ borderWidth: 2, height: 50, width: width * 0.7 }}>
        <Picker enabled={this.state.modal == 'checkIn' ? true : false}
          selectedValue={this.state.customerId}
          style={{ height: 50, width: width * 0.7 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ customerId: itemValue })
          }>
          {this.props.customersLocal.customers.map((item, index) => {
            return (<Picker key={index} label={`${item.name} - ${item.phone_number}`} value={item.id} />
            )
          })}
        </Picker>
      </View>
      <Label style={styles.contentTitle}>{this.state.modal == 'checkIn' ? 'Duration (minutes)' : 'Duration left'}</Label>
      <View style={{ flexDirection: 'row', width: width * 0.7, borderWidth: 2, marginHorizontal: 90, marginBottom: 10 }}>
        <Input disabled={this.state.modal == 'checkIn' ? false : true} 
        backgroundColor={this.state.modal == 'checkIn' ? 'white' : 'grey'}
        value={this.state.modal == 'checkIn' ? this.state.duration.toString() : this.state.duration.toString()+' mins'}
         onChangeText={(e) => this.setState({ duration: e })} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button danger style={styles.Button}
          onPress={() => this.setState({ visibleModal: null, roomName: '',disabled:!this.state.disabled,duration:'' })}>
          <Text>Cancel</Text>
        </Button>
        {this.state.modal == 'checkIn' ?
          <Button disabled={this.state.disabled} success style={styles.Button}
            onPress={() => {
              this.checkIn()
            }}>
            <Icon style={{ marginLeft: 10 }} name='check' color='white'></Icon>
            <Text>Check In</Text>
          </Button>
          :
          <Button disabled={this.state.disabled} success style={styles.Button}
            onPress={() => {
              this.checkOut(this.state.orderId)
            }}>
            <Icon style={{ marginLeft: 10 }} name='check' color='white'></Icon>
            <Text>Check Out</Text>
          </Button>
        }
      </View>
    </View>
  )

  async editRoom() {
    this.setState({ disabled: !this.state.disabled })
    await this.props.handleEditRoom({
      roomId: this.state.roomId,
      roomName: this.state.roomName,
      token: this.props.loginLocal.login.token
    })
    this.roomChecker()
    Alert.alert(
      'Edit Room Success',
      `by : ${this.props.loginLocal.login.email}`,
      [
        { text: 'Ok', onPress: () => this.setState({ visibleModal: null, disabled: !this.state.disabled, roomName: '' }) },
      ],
      { cancelable: false },
    )
  }
  async checkIn() {
    const { roomId, customerId, duration } = this.state
    this.setState({ disabled: !this.state.disabled })
    await this.props.handleCheckIn({
      roomId,
      customerId,
      duration,
      token: this.props.loginLocal.login.token
    })
    await this.ordersChecker()
    Alert.alert(
      'Check In Success',
      `by : ${this.props.loginLocal.login.email}, duration : ${this.state.duration} minutes`,
      [
        { text: 'Yay', onPress: () => this.setState({ visibleModal: null, disabled: !this.state.disabled, duration: '',orderId:'' }) },
      ],
      { cancelable: false }
    )
  }
  async checkOut(orderId) {
    this.setState({ disabled: !this.state.disabled })
    await this.props.handleCheckOut({
      orderId,
      token: this.props.loginLocal.login.token
    })
    await this.ordersChecker()
    if(this.state.orderId!==''){
      Alert.alert(
        'Check Out Success',
        `by : ${this.props.loginLocal.login.email}`,
        [
          { text: 'Yay', onPress: () => this.setState({ visibleModal: null, disabled: !this.state.disabled, duration: '',orderId:'' }) },
        ],
        { cancelable: false }
      )
    }
  }
  async addRoom() {
    this.setState({ disabled: !this.state.disabled })
    await this.props.handleAddRoom({
      roomName: this.state.roomName,
      token: this.props.loginLocal.login.token
    })
    this.roomChecker()
    Alert.alert(
      'Add Room Success',
      `by : ${this.props.loginLocal.login.email}`,
      [
        { text: 'Yay', onPress: () => this.setState({ visibleModal: null, disabled: !this.state.disabled,duration:'' }) },
      ],
      { cancelable: false },
    )
  }
  render() {
    const { rooms } = this.props.roomsLocal
    let {queues} = this.props.ordersLocal
    return (
      <Container>
        <Modal
          isVisible={this.state.visibleModal === 'swipeable'}
          backdropColor="#B4B3DB"
          animationInTiming={500}
          animationOutTiming={500}
          onSwipeComplete={() => this.setState({ visibleModal: null ,disabled:!this.state.disabled,duration:''})}
          swipeDirection={['up', 'left', 'right', 'down']}>
          {this.state.modal == 'add' || this.state.modal == 'edit' ?
            this.renderRoomModal()
            :
            this.renderCheck()
          }
        </Modal>
        <FlatGrid
          itemDimension={width * 0.2}
          items={rooms}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index}
              onPress={() =>
                queues.filter(e => e.room_id == item.id) == '' ?
                  this.setState({
                    visibleModal: 'swipeable',
                    roomName: item.name,
                    modal: 'checkIn',
                    roomId: item.id
                  })
                  :
                  this.setState({
                    visibleModal: 'swipeable',
                    roomName: item.name,
                    modal: 'checkOut',
                    roomId: item.id,
                    duration:queues[queues.findIndex(e=>e.room_id==item.id)].order_end_time,
                    orderId:queues[queues.findIndex(e=>e.room_id==item.id)].id
                  })
              }
              delayLongPress={400}
              onLongPress={() =>
                this.setState({
                  visibleModal: 'swipeable',
                  modal: 'edit',
                  roomName: item.name,
                  roomId: item.id
                })
              }
            >
              <View style={[styles.itemContainer, {
                backgroundColor:
                  queues.filter(e => e.room_id == item.id) == '' ? 'grey' : 'green'
              }]}>
                <Text style={styles.itemName}>{item.name}</Text>
                {queues.filter(e => e.room_id == item.id) == '' ? 
                <Text style={styles.itemCaption}> Available</Text>
                : <Text style={styles.itemCaption}>{queues[queues.findIndex(e=>e.room_id==item.id)].order_end_time/60<1 ? queues[queues.findIndex(e=>e.room_id==item.id)].order_end_time +' seconds left' : Math.floor(queues[queues.findIndex(e=>e.room_id==item.id)].order_end_time/60)+' minutes left'}</Text>
                }
              </View>
            </TouchableOpacity>
          )}
        />
        <Fab onPress={() => this.setState({ visibleModal: 'swipeable', modal: 'add',roomName:'' })}
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
    ordersLocal: state.orders,
    roomsLocal: state.rooms,
    customersLocal: state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCheckIn: (params) => dispatch(actionOrders.handleCheckIn(params)),
    handleCheckOut: (params) => dispatch(actionOrders.handleCheckOut(params)),
    handleAddRoom: (params) => dispatch(actionRooms.handleAddRoom(params)),
    handleGetRooms: (params) => dispatch(actionRooms.handleGetRooms(params)),
    handleGetQueues: (params) => dispatch(actionOrders.handleGetQueues(params)),
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
    height: height * 0.1,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCaption: {
    fontSize: 8,
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
  Button: {
    marginHorizontal: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black'
  }
});
