import React,{Component} from 'react';
import {Keyboard,View,Image,Dimensions,StyleSheet,Alert,AsyncStorage,ImageBackground}from 'react-native';
import {Button,Input,Text,Container,Form,Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actionAccount from '../redux/actions/actionAccount'

import { connect } from 'react-redux'



const {width,height} = Dimensions.get('window') 
class Register extends Component{
    constructor(){
        super();
        this.state = {
            emailInput : '',
            passwordInput : '',
            confirmPasswordInput : '',
            hidePassword : true,
            hidePassword2 : true,
            eye : 'eye-slash',
            eye2 : 'eye-slash',
            emailRegex : '[a-z0-9]*[a-z0-9\.]+@[a-z0-9]+(\.[a-z0-9]+)*(\.[a-z0-9]+)',
        }
    }
    changeeyeState = ()=>{
        {this.state.eye=='eye' ? this.setState({eye : 'eye-slash',hidePassword : true}): this.setState({eye : 'eye',hidePassword : false})}
    }
    changeeyeState2 = ()=>{
        {this.state.eye2=='eye' ? this.setState({eye2 : 'eye-slash',hidePassword2 : true}): this.setState({eye2 : 'eye',hidePassword2 : false})}
    }
    registerChecker=async()=>{  
        Keyboard.dismiss()
        const email = String(this.state.emailInput).toLowerCase()
        const password = String(this.state.passwordInput)
        const confirmPassword = String(this.state.confirmPasswordInput)
        const regex = this.state.emailRegex
        let regexResult = email.match(regex)
        console.log(this.state.confirmPasswordInput)
        {regexResult==null? regexResult = '' : regexResult = regexResult[0]}
        if(email!==''){
            if(password!==''){
                if(confirmPassword!==''){
                    if(password==confirmPassword){
                        if(regexResult==email){
                            await this.props.handleRegister(email,password)
                            console.log(this.props.registerLocal.register.token)
                            if(this.props.registerLocal.register.token){
                                await AsyncStorage.setItem("token",this.props.registerLocal.register.token)
                                Alert.alert(
                                    'new WTHubber Arise !!',
                                    'Welcome to The Club, LULULU',
                                    [
                                        {text: 'Yay', onPress: () => this.props.navigation.navigate('Loading',{
                                            id : this.props.registerLocal.register.id,
                                            email : this.props.registerLocal.register.email,
                                            image : this.props.registerLocal.register.image
                                        })},
                                    ],
                                    {cancelable: false},
                                    )
                            }
                            else alert('Email had been Registered',{cancelable:false})
                        }
                        else alert('Invalid Email Syntax',{cancelable:false})
                    }
                    else alert('Password Confirmation Does Not Match',{cancelable:false})
                }
                else alert('Please Confirm Your Password',{cancelable:false})
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
                        <Image style = {styles.Banner} source = {{uri : 'https://avvesione.files.wordpress.com/2015/12/death_parade-07-quin-nona-ginti-decim-quindecim-alcohol-drinks-cheers-raising_glasses-bar.jpg'}}/>
                        <Text style = {{fontSize : 20}} >Join the Hubbers</Text>
                    </View>
                    <Form style={styles.Form}>
                        <Label style = {styles.Label}>Email</Label>
                        <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                            <Input onChangeText = {(e)=>this.setState({emailInput : e})}/>
                        </View>
                        <Label style = {styles.Label}>Password</Label>
                        <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                            <Input secureTextEntry = {this.state.hidePassword} onChangeText = {(e)=>this.setState({passwordInput : e})}/>
                            <Icon style={{marginVertical: width*0.03,marginRight : width*0.03}} name = {this.state.eye} size={25} onPress = {()=>this.changeeyeState()}></Icon>
                        </View>
                        <Label style = {styles.Label}>Confirm Password</Label>
                        <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                            <Input secureTextEntry = {this.state.hidePassword2} onChangeText = {(e)=>this.setState({confirmPasswordInput : e})}/>
                            <Icon style={{marginVertical: width*0.03,marginRight : width*0.03}} name = {this.state.eye2} size={25} onPress = {()=>this.changeeyeState2()}></Icon>
                        </View>
                        <Button success block rounded style = {styles.Button} onPress = {()=>this.registerChecker()}><Text>Register</Text></Button>
                        <View style={{alignItems:'center'}}>
                        <Text>Already have an account?</Text>
                        <Text onPress={()=>this.props.navigation.navigate('Login')} style = {styles.Text}>Log In</Text>  
                        </View>
                    </Form> 
                </ImageBackground>

            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        registerLocal: state.register
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      handleRegister: (email,password) => dispatch(actionAccount.handleRegister(email,password)),
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register);
  
  const styles = StyleSheet.create({
    Background:{
        height,width,
        alignItems:'center',
        justifyContent:'center'
    },
    Button : {
        marginHorizontal : width*0.3,
        marginBottom:height*0.02,
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
    Header:{flex:1,alignItems:'center'},
    Label:{marginLeft : width*0.1},
    Form:{flex:1.5},

})