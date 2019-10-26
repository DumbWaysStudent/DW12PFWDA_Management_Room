import React, {Component} from 'react'
import {StyleSheet,AsyncStorage} from 'react-native'
import {Text,Form,Content,Container,Button, Label,View,Input,List}from 'native-base'
import {Dummy} from '../components/Dummy'
import HeaderEdit from '../components/Headers/HeaderEdit'
import { connect } from 'react-redux'
import {withNavigation} from 'react-navigation'
import * as actionRooms from '../redux/actions/actionRooms'



const data = [...Dummy.data]

class EditRoom extends Component{
  constructor(props){
    super(props)
    this.state = {
        roomName:''
    }
  }
  async componentDidMount(){
    this.setState({roomName:this.props.navigation.getParam('name')})
    }

  async edit(){
    console.log(this.props.navigation.getParam('id'))

    await this.props.handleEditRoom({
      roomId:this.props.navigation.getParam('id'),
      roomName:this.state.roomName,
      token:this.props.loginLocal.login.token
    })
    alert('success')
    this.props.navigation.navigate('Loading')
  }
  render(){
    return(
      <Container>
        <HeaderEdit title = 'Edit Room' navigation = {this.props.navigation}/>
        <Form>
            <Label style = {styles.Label}>Room Name</Label>
            <View style = {{flexDirection : 'row',borderWidth : 2,marginVertical : 10}}>
                <Input value={this.state.roomName} onChangeText = {(e)=>this.setState({roomName : e})}/>
            </View>
            <Button success block rounded style = {styles.Button} onPress = {()=>this.edit()}><Text>Edit</Text></Button>
        </Form> 
        

    </Container> 
    )
  }
}
const mapStateToProps = state => {
  return {
    loginLocal: state.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleEditRoom: (params) => dispatch(actionRooms.handleEditRoom(params))      
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(EditRoom));
const styles = StyleSheet.create({
  Button : {
    marginBottom : 20,
    marginHorizontal : 80,
    borderWidth : 2,
    borderColor : 'black'
  },

})