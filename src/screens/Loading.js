import React, {Component} from 'react'
import {View,Dimensions,ImageBackground,StyleSheet,Image} from 'react-native'
import {Text}from 'native-base'
import * as actionRooms from '../redux/actions/actionRooms'
import * as actionCustomers from '../redux/actions/actionCustomers'
import { connect } from 'react-redux'



const {height, width } = Dimensions.get('window');
class Loading extends Component{
    async componentDidMount(){
        setTimeout( async () => {
          await this.props.handleGetRooms({
            token:this.props.loginLocal.login.token
          })
          await this.props.handleGetCheckIn({
            token:this.props.loginLocal.login.token
          })
          await this.props.handleGetCustomers({
            token:this.props.loginLocal.login.token
          })
          this.props.navigation.navigate('Home')
        }, 0);
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
      handleGetCheckIn: (params) => dispatch(actionRooms.handleGetCheckIn(params)),     
      handleGetCustomers: (params) => dispatch(actionCustomers.handleGetCustomers(params)),

    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Loading);
  