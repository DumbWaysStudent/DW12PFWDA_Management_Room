import React, {Component} from 'react'
import {View,Dimensions,ImageBackground,StyleSheet,Image,AsyncStorage} from 'react-native'
import {Text}from 'native-base'
import * as actionRooms from '../redux/actions/actionRooms'
import * as actionAccount from '../redux/actions/actionAccount'
import * as actionCustomers from '../redux/actions/actionCustomers'
import * as actionOrders from '../redux/actions/actionOrders'
import { connect } from 'react-redux'



const {height, width } = Dimensions.get('window');
class Loading extends Component{
    async componentDidMount(){
      await AsyncStorage.getItem('data',(err,res)=>{
        const data = JSON.parse(res)
        if(!data){
          this.props.navigation.navigate('Account')
        }
        else{
          setTimeout(async () => {
          await this.props.handleStoreData(data)
          await this.props.handleGetRooms({
            token:this.props.loginLocal.login.token
          })
          await this.props.handleGetOrders({
            token:this.props.loginLocal.login.token
          })
          await this.props.handleGetCustomers({
            token:this.props.loginLocal.login.token
          })
          await this.props.handleGetQueues({
            token:this.props.loginLocal.login.token
          })
          this.props.navigation.navigate('Home')
          }, 0);
          
        }
      })
      

    }
    render(){
        return(
        <View>
            <ImageBackground source = {require('../assets/background.jpg')} style = {styles.loadingBackground}>
            <View style = {{flexDirection:'row'}}>
            <Image style = {styles.loadingImage} source = {require('../assets/loading.gif')}/>
            <Image style = {styles.loadingImage} source = {require('../assets/loading2.gif')}/>
            </View>
            <Text>Wait</Text>
            </ImageBackground>
        </View>
        )
    }
}
const styles = StyleSheet.create({
      loadingBackground:{
        height,width,
        alignItems:'center',
        justifyContent:'center'
      },
      loadingImage:{
        height: height*0.2,
        width:width*0.3
      }

  });
  
  const mapStateToProps = state => {
    return {
      loginLocal: state.login,

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      handleGetRooms: (params) => dispatch(actionRooms.handleGetRooms(params)), 
      handleGetOrders: (params) => dispatch(actionOrders.handleGetOrders(params)),     
      handleGetCustomers: (params) => dispatch(actionCustomers.handleGetCustomers(params)),
      handleStoreData: (params) => dispatch(actionAccount.handleStoreData(params)),
      handleGetQueues: (params) => dispatch(actionOrders.handleGetQueues(params)),
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Loading);
  