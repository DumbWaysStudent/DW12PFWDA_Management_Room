import React, { Component } from 'react'
import { TouchableOpacity, View, Dimensions, Alert, StyleSheet, Picker,ImageBackground } from 'react-native'
import { Text, Container, Button, Label, Input, Fab } from 'native-base'
import Modal from 'react-native-modal'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatGrid } from 'react-native-super-grid';
import * as actionTables from '../redux/actions/actionTables'
import * as actionOrders from '../redux/actions/actionOrders'
import { connect } from 'react-redux'
import moment from 'moment'
import HeaderMain from '../components/Headers/HeaderMain'


const { height, width } = Dimensions.get('window');

class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableId: '',
      orderId:'',
      customerId: 1,
      modal: '',
      tableName: '',
      duration: '',
      disabled: false,
      orders: null
    }
  }
  async componentDidMount() {
    const { navigation } = this.props
    this.focusListener = navigation.addListener('didFocus', async () => {
      this.setState({disabled:false})
    })
    await this.queuesChecker()
    this.interval = setInterval(async () => await this.queuesChecker() , 5000)
    await this.tableChecker()
  }
  componentWillUnmount() {
    // Remove the event listener
    clearInterval(this.interval)
    this.focusListener.remove();
  }

  async queuesChecker() {
    let {queues}=this.props.ordersLocal
    if(queues=='') {
      return 0
    }
    this.setState({})
    while (queues.length!==0) {
      const timeLeft = moment(queues[0].order_end_time).diff(moment(),'seconds')
      if(timeLeft<=0){
        await this.checkOut(queues[0].id)
        queues.splice(0,1)
      } 
      else return 0
    }
   }

  pressFunc(params){
    const {queues}=this.props.ordersLocal
    const tableId= params.tableId
    const tableName= params.tableName
    const index = queues.findIndex(e=>e.table_id==tableId)
    if(index ==-1) {
        this.setState({
          visibleModal: 'swipeable',
          modal: 'checkIn',
          tableId,
          tableName
      })
    }
    else {
        const duration=queues[queues.findIndex(e=>e.table_id==tableId)].order_end_time
        const orderId=queues[queues.findIndex(e=>e.table_id==tableId)].id
        this.setState({
          visibleModal: 'swipeable',
          modal: 'checkOut',
          tableId,
          tableName,
          orderId,
          duration:moment(duration).diff(moment(),'seconds')
      })
    }
   }

  async tableChecker() {
    await this.props.handleGetTables({
      token: this.props.loginLocal.login.token
    })
    this.setState(this.state)
  }
  renderTableModal = () => (
    <View style={styles.content}>
      <Label style={styles.contentTitle}>Table Name</Label>
      <View style={{ flexDirection: 'row', borderWidth: 2, marginHorizontal: 40, marginVertical: 10 }}>
        <Input value={this.state.tableName} onChangeText={(e) => this.setState({ tableName: e })} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button danger style={{ marginHorizontal: 10 }}
          onPress={() => this.setState({ visibleModal: null ,disabled:false})}>
          <Text>Cancel</Text>
        </Button>
        {this.state.modal == 'add' ?
          <Button disabled={this.state.disabled} success style={{ marginHorizontal: 10 }}
            onPress={() => {
              this.addTable()
            }}>
            <Text>Add</Text>
          </Button>
          :
          <Button disabled={this.state.disabled} warning style={{ marginHorizontal: 10 }}
            onPress={() => {
              this.editTable()
            }}>
            <Text>Edit</Text>
          </Button>
        }
      </View>
    </View>
  )

  renderCheck = () => (
    <View style={styles.content}>
      <Label style={styles.contentTitle}>Table Name</Label>
      <View style={{ flexDirection: 'row', borderWidth: 2, width: width * 0.7, marginHorizontal: 90 }}>
        <Input
        backgroundColor={this.state.modal == 'checkIn' ? 'white' : 'grey'}
        disabled={true} value={this.state.tableName} onChangeText={(e) => this.setState({ tableName: e })} />
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
        value={this.state.modal == 'checkIn' ? 
        this.state.duration.toString() :
        Math.floor(this.state.duration.toString()/60)<1 ? 
        this.state.duration.toString()+' seconds' :
        Math.floor(this.state.duration.toString()/60)+' minutes'}
         onChangeText={(e) => this.setState({ duration: e })} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button danger style={styles.Button}
          onPress={() => this.setState({ visibleModal: null, tableName: '',disabled:!this.state.disabled,duration:'',oderId:''})}>
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

  async editTable() {
    this.setState({ disabled: !this.state.disabled })
    await this.props.handleEditTable({
      tableId: this.state.tableId,
      tableName: this.state.tableName,
      token: this.props.loginLocal.login.token
    })
    this.tableChecker()
    Alert.alert(
      'Edit Table Success',
      `by : ${this.props.loginLocal.login.email}`,
      [
        { text: 'Ok', onPress: () => this.setState({ visibleModal: null, disabled: !this.state.disabled, tableName: '' }) },
      ],
      { cancelable: false },
    )
  }
  async checkIn() {
    const { tableId, customerId, duration } = this.state
    this.setState({ disabled: !this.state.disabled })
    await this.props.handleCheckIn({
      tableId,
      customerId,
      duration,
      token: this.props.loginLocal.login.token
    })
    await this.props.handleGetQueues({
      token:this.props.loginLocal.login.token
    })
    await this.props.handleGetOrders({
      token:this.props.loginLocal.login.token
    })
    this.setState(this.state)
    Alert.alert(
      'Check In Success',
      `by : ${this.props.loginLocal.login.email}, duration : ${this.state.duration} minutes`,
      [
        { text: 'Yay', onPress: () => this.setState({ visibleModal: null, disabled: false, duration: '',orderId:'' }) },
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
    await this.props.handleGetQueues({
      token:this.props.loginLocal.login.token
    })
    await this.props.handleGetOrders({
      token:this.props.loginLocal.login.token
    })
    if(this.state.orderId!==''){
      Alert.alert(
        'Check Out Success',
        `by : ${this.props.loginLocal.login.email}`,
        [
          { text: 'Yay', onPress: () => this.setState({ visibleModal: null, disabled: false, duration: '',orderId:'' }) },
        ],
        { cancelable: false }
      )
    }
  }
  async addTable() {
    this.setState({ disabled: !this.state.disabled })
    await this.props.handleAddTable({
      tableName: this.state.tableName,
      token: this.props.loginLocal.login.token
    })
    this.tableChecker()
    Alert.alert(
      'Add Table Success',
      `by : ${this.props.loginLocal.login.email}`,
      [
        { text: 'Yay', onPress: () => this.setState({ visibleModal: null, disabled: !this.state.disabled,duration:'' }) },
      ],
      { cancelable: false },
    )
  }
  showStatus(tableId,tableName){
    const {queues} = this.props.ordersLocal
    if(queues.findIndex(e=>e.table_id==tableId)==-1){
      return(
        <View style={[styles.itemContainer, {backgroundColor:'grey'}]}>
        <Text style={styles.itemName}>{tableName}</Text>
        <Text style={styles.itemCaption}> Available</Text>
      </View>
      )  
    }
    else {
      const orderEndTime = queues[queues.findIndex(e=>e.table_id==tableId)].order_end_time
      const customer = queues[queues.findIndex(e=>e.table_id==tableId)].customer.name
      const timeLeft = moment(orderEndTime).diff(moment(),'seconds')
      if(timeLeft/60<1){
        return(
        <View style={[styles.itemContainer, {backgroundColor:'green'}]}>
          <Text style={styles.itemName}>{tableName}</Text>
          <Text style={styles.itemCaption}>{customer}</Text>
          <Text style={styles.itemCaption}>{timeLeft} seconds left</Text>
        </View>
        )
      }
      else return(
      <View style={[styles.itemContainer, {backgroundColor:'green'}]}>
        <Text style={styles.itemName}>{tableName}</Text>
        <Text style={styles.itemCaption}>{customer}</Text>
        <Text style={styles.itemCaption}>{Math.floor(timeLeft/60)} minutes left</Text>
      </View>
      )
    }
  }
  render() {
    const { tables } = this.props.tablesLocal
    return (
      <Container>
        <ImageBackground source = {require('../assets/background.jpg')} style={{width,height}} >
        <HeaderMain title = 'Tables' navigation = {this.props.navigation}/>
        <FlatGrid
          itemDimension={width * 0.2}
          items={tables}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index}
              onPress={() =>this.pressFunc({
                tableId:item.id,
                tableName:item.name
              })}
              delayLongPress={400}
              onLongPress={() =>
                this.setState({
                  visibleModal: 'swipeable',
                  modal: 'edit',
                  tableName: item.name,
                  tableId: item.id
                })
              }
            >
                {this.showStatus(item.id,item.name)} 
            </TouchableOpacity>
          )}
        />
        </ImageBackground>
        <Modal
          isVisible={this.state.visibleModal === 'swipeable'}
          backdropColor="#B4B3DB"
          animationInTiming={500}
          animationOutTiming={500}
          onSwipeComplete={() => this.setState({ visibleModal: null ,disabled:false,duration:''})}
          swipeDirection={['up', 'left', 'right', 'down']}>
          {this.state.modal == 'add' || this.state.modal == 'edit' ?
            this.renderTableModal()
            :
            this.renderCheck()
          }
        </Modal>
 
        <Fab onPress={() => this.setState({ visibleModal: 'swipeable', modal: 'add',tableName:'' })}
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
    tablesLocal: state.tables,
    customersLocal: state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCheckIn: (params) => dispatch(actionOrders.handleCheckIn(params)),
    handleCheckOut: (params) => dispatch(actionOrders.handleCheckOut(params)),
    handleAddTable: (params) => dispatch(actionTables.handleAddTable(params)),
    handleGetTables: (params) => dispatch(actionTables.handleGetTables(params)),
    handleGetQueues: (params) => dispatch(actionOrders.handleGetQueues(params)),
    handleGetOrders: (params) => dispatch(actionOrders.handleGetOrders(params)),
    handleEditTable: (params) => dispatch(actionTables.handleEditTable(params)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Tables));

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
    alignItems:'flex-end',
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
