import React, {Component} from 'react'
import {StyleSheet,AsyncStorage} from 'react-native'
import {Text,Form,Content,Container,Button, Label,View,Input,List}from 'native-base'
import {Dummy} from '../components/Dummy'
import HeaderEdit from '../components/Headers/HeaderEdit'
import { connect } from 'react-redux'
import {withNavigation} from 'react-navigation'
import * as actionCustomers from '../redux/actions/actionCustomers'



const data = [...Dummy.data]

class EditCustomer extends Component{
  constructor(props){
    super(props)
    this.state = {
        name:'',
        idNumber:'',
        phoneNumber:''
    }
  }
  async componentDidMount(){
    this.setState({name:this.props.navigation.getParam('name'),
    idNumber:this.props.navigation.getParam('idNumber'),
    phoneNumber:this.props.navigation.getParam('phoneNumber')
    })}

  async edit(){
    console.log(this.props.navigation.getParam('id'))

    await this.props.handleEditCustomer({
      id:this.props.navigation.getParam('id'),
      name:this.state.name,
      idNumber:this.state.idNumber,
      phoneNumber:this.state.phoneNumber,
      token:this.props.loginLocal.login.token
    })
    alert('success')
    this.props.navigation.navigate('Loading')
  }
  render(){
    return(
      <Container>
        <HeaderEdit title = 'Edit Customer' navigation = {this.props.navigation}/>
        <Form>
            <Label style = {styles.Label}>Name</Label>
            <View style = {{flexDirection : 'row',borderWidth : 2,marginVertical : 10}}>
                <Input value={this.state.name} onChangeText = {(e)=>this.setState({name : e})}/>
            </View>
            <Label style = {styles.Label}>ID Number</Label>
            <View style = {{flexDirection : 'row',borderWidth : 2,marginVertical : 10}}>
                <Input value={this.state.idNumber} onChangeText = {(e)=>this.setState({idNumber : e})}/>
            </View>
            <Label style = {styles.Label}>Phone Number</Label>
            <View style = {{flexDirection : 'row',borderWidth : 2,marginVertical : 10}}>
                <Input value={this.state.phoneNumber} onChangeText = {(e)=>this.setState({phoneNumber : e})}/>
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
    handleEditCustomer: (params) => dispatch(actionCustomers.handleEditCustomer(params))      
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(EditCustomer));
const styles = StyleSheet.create({
  Button : {
    marginBottom : 20,
    marginHorizontal : 80,
    borderWidth : 2,
    borderColor : 'black'
  },

})