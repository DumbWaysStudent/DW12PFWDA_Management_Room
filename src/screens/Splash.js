import React, {Component} from 'react'
import {View,Dimensions,ImageBackground,StyleSheet,Image,AsyncStorage} from 'react-native'
import {Text}from 'native-base'



const {height, width } = Dimensions.get('window');
class Splash extends Component{
    async componentDidMount(){
        setTimeout(async () => {
            await AsyncStorage.getItem('data',(err,res)=>{
                const data = JSON.parse(res)
                if(!data){
                    this.props.navigation.navigate('Account')
                }
                else{
                    this.props.navigation.navigate('Loading')
                }
            })
        }, 3000);
    }
    render(){
        return(
        <View>
            <ImageBackground source = {require('../assets/background.jpg')} style = {styles.loadingBackground}>
            <View style = {{flexDirection:'row'}}>
            <Image style = {styles.loadingImage} source = {require('../assets/logo.png')}/>
            </View>
            <Text>Polley Corp. All Rights Reserved, 2019</Text>
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
        width:height*0.2,
        borderRadius:height*0.2
      }

  });
  
  export default Splash
  