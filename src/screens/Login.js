import React,{Component} from 'react';
import {Keyboard,View,Image,Dimensions,StyleSheet,Alert,AsyncStorage,ImageBackground}from 'react-native';
import {Button,Input,Text,Form,Label,Toast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actionAccount from '../redux/actions/actionAccount'

import { connect } from 'react-redux'



const {width,height} = Dimensions.get('window') 
class Login extends Component{
    constructor(){
        super();
        this.state = {
            emailInput : '',
            passwordInput : '',
            hidePassword : true,
            eye : 'eye-slash',
            emailRegex : '[a-z0-9]*[a-z0-9\.]+@[a-z0-9]+(\.[a-z0-9]+)*(\.[a-z0-9]+)',
            form:'login'
        }
    }
    componentDidMount(){
        AsyncStorage.clear()
    }
    changeeyeState = ()=>{
        {this.state.eye=='eye' ? this.setState({eye : 'eye-slash',hidePassword : true}): this.setState({eye : 'eye',hidePassword : false})}
    }
    loginChecker=async()=>{  
        Keyboard.dismiss()
        const email = String(this.state.emailInput).toLowerCase()
        const password = String(this.state.passwordInput)
        const regex = this.state.emailRegex
        let regexResult = email.match(regex)
        
        {regexResult==null? regexResult = '' : regexResult = regexResult[0]}
        if(email!==''){
            if(password!==''){
                if(regexResult==email){
                    await this.props.handleLogin(email,password)
                    if(this.props.loginLocal.login.token){
                        await AsyncStorage.setItem("data",JSON.stringify(this.props.loginLocal.login))
                        Alert.alert(
                            'Login Success',
                            `Happy Dutying, ${this.props.loginLocal.login.email}`,
                            [
                                {text: 'Yay', onPress: () => this.props.navigation.navigate('Loading')},
                            ],
                            {cancelable: false},
                            )
                    }
                    else alert('Invalid email or Password',{cancelable:false})
                }
                else alert('Invalid Email Syntax',{cancelable:false})
            }
            else alert('Password cannot be blank',{cancelable:false})
        }
        else alert('Email cannot be blank',{cancelable:false})        
    }
    
    render(){
        return(
            <View>
                <ImageBackground source = {require('../assets/background.jpg')} style = {styles.Background}>
                <View style = {styles.Header}>
                    <Text style = {{fontSize : 20}} >Polley Pool Arena Management</Text>
                </View>    
                    <Form style = {styles.Form}>
                        <Label style = {styles.Label}>Email</Label>
                        <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                            <Input onChangeText = {(e)=>this.setState({emailInput : e})}/>
                        </View>
                        <Label style = {styles.Label}>Password</Label>
                        <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                            <Input secureTextEntry = {this.state.hidePassword} onChangeText = {(e)=>this.setState({passwordInput : e})}/>
                            <Icon style={{marginVertical: width*0.03,marginRight : width*0.03}} name = {this.state.eye} size={25} onPress = {()=>this.changeeyeState()}></Icon>
                        </View>
                        <Button success block rounded style = {styles.Button} onPress = {()=>this.loginChecker()}><Text>Log In</Text></Button>
                    </Form> 
                </ImageBackground>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        loginLocal: state.login,
        registerLocal: state.register,
        favoritesLocal:state.favorites
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      handleLogin: (email,password) => dispatch(actionAccount.handleLogin(email,password)),
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);
  
const styles = StyleSheet.create({
    Background:{
        height,width,
        alignItems:'center',
        justifyContent:'center'
    },
    Button : {
        marginHorizontal : width*0.3,
        marginBottom:height*0.06,
        borderWidth : 2,
        borderColor : 'black'
    },
    Text : {
        textDecorationLine:'underline',
        color:'blue'
    },
    Banner:{
        width : width,
        height : height*0.3
    },
    Header:{
        marginTop:-height*0.1,
        alignItems:'center'
    },
    Form:{marginTop:height*0.1},
    Label:{marginLeft : width*0.1}
})