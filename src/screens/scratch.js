import React, {Component} from 'react'
import {TouchableOpacity,View,Dimensions,Alert,ImageBackground,StyleSheet,AsyncStorage,Modal,TouchableHighlight} from 'react-native'
import {Text,Container,Button,Label,Input}from 'native-base'
import {withNavigation} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatGrid } from 'react-native-super-grid';
import * as actionRooms from '../redux/actions/actionRooms'
import { connect } from 'react-redux'


const {height, width } = Dimensions.get('window');
class Rooms extends Component{
    constructor(props){
        super(props)
        this.state = {
            visibleModal: false,
            roomName:''
        }
    }
    componentDidMount(){
      const {navigation}=this.props
      this.focusListener = navigation.addListener('didFocus', () => {
        this.setState(this.state)
      });
    }
    componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();
    }
    renderModalContent = () => (
    <View>
    <Label>Room Name</Label>
    <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
        <Input onChangeText = {(e)=>this.setState({roomName : e})}/>
    </View>
    <View style = {{flexDirection:'row',justifyContent:'center'}}>
    <Button transparent block
        onPress={() => {
            this.setState({visibleModal: null})
        }}>
        <Text>Cancel</Text>
    </Button>
    <Button transparent block
        onPress={() => {
        this.addRoom()
        }}>
        <Text>Add</Text>
    </Button>
    </View>
    </View>

      );
    async addRoom(){
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
            {text: 'Yay', onPress: () =>this.setModalVisible(!this.state.modalVisible)},
        ],
        {cancelable: false},
        )
    }
    render(){
      console.log(this.props.checkInLocal.checkIn)
      const {rooms} = this.props.roomsLocal
      return (
        <Container>
          <FlatGrid
          itemDimension={130}
          items={rooms}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditRoom',{
              id:item.id,
              name:item.name
            })}>
              <View style={[styles.itemContainer, { backgroundColor: 'green' }]}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            </TouchableOpacity>
            
            
          )}
          
        />
        <Modal
          isVisible={this.state.visibleModal === 'swipeable'}
          animationInTiming={600}
          animationOutTiming={600}
          onSwipeComplete={() => this.setState({visibleModal: null})}
          swipeDirection={['down','up','left','right']}>
          {this.renderModalContent()}
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
        </Modal>

        <Button
          onPress={() => this.setState({visibleModal: 'swipeable'})}
        ><Text>Add</Text></Button>
     
        </Container>
        
        
        
      );
      
  }
}
const mapStateToProps = state => {
  return {
    loginLocal: state.login,
    checkInLocal: state.checkIn,
    roomsLocal: state.rooms,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddRoom: (params) => dispatch(actionRooms.handleAddRoom(params)),
    handleGetRooms: (params) => dispatch(actionRooms.handleGetRooms(params)),   
    handleGetCheckIn: (params) => dispatch(actionRooms.handleGetCheckIn(params)),

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
    height: 150,
  },
  itemContainer2: {
    
    marginHorizontal:150,
    height: 50,
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
});
 