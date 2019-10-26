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
            modalVisible: false,
            roomName:''
        }
    }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
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
    async addRoom(){
      console.log(this.props.loginLocal.login.token)
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
              <View style={[styles.itemContainer, { backgroundColor: 'grey' }]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.name}</Text>
            </View>
            </TouchableOpacity>
            
            
          )}
          
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Label>Room Name</Label>
              <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                  <Input onChangeText = {(e)=>this.setState({roomName : e})}/>
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
                  this.addRoom()
                }}>
                <Text>Add</Text>
              </Button>
              </View>

            </View>
          </View>
        </Modal>

        <Button block
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Add</Text>
        </Button>
     
        </Container>
        
        
        
      );
      
  }
}
const mapStateToProps = state => {
  return {
    loginLocal: state.login,
    roomsLocal: state.rooms,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddRoom: (params) => dispatch(actionRooms.handleAddRoom(params)),
    handleGetRooms: (params) => dispatch(actionRooms.handleGetRooms(params))      
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
 