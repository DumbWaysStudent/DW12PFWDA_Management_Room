import React, {Component} from 'react'
import {TouchableOpacity,Share,Image,Dimensions,StyleSheet,ImageBackground} from 'react-native'
import {View,Text,Content,Container,ListItem,Left, Body, Right}from 'native-base'
import HeaderShare from '../components/Headers/HeaderShare'
import { connect } from 'react-redux'


const {height,width} = Dimensions.get('window')
class Profile extends Component{
    constructor(props) {
        super(props)

        this.state = {
            isRefresh:1
        }
    }
    async componentDidMount(){
    }
    onSharePress = () => Share.share(shareOptions);
    render(){
        const{login}=this.props.loginLocal
        const name = this.props.navigation.getParam('name')
        const image = this.props.navigation.getParam('image')
        return(
            <Container>
            <ImageBackground source = {require('../assets/background.jpg')} style={{width,height}} >
            <HeaderShare title = 'My Profile' navigation = {this.props.navigation}/>
            <Content>
                <View>
                <TouchableOpacity  onPress = {()=>this.props.navigation.navigate('EditProfile',{title : 'Edit Profile',
                name:!name? login.email:name,
                image:!image? login.image:image
                })}>
                    <Body>
                    <Image source = {{uri:!image ? login.image : image}} style={styles.profilePic} ></Image>
                        <Text>
                        {!name ? login.email : name}
                        </Text>
                    </Body>
                </TouchableOpacity>
                </View>
            </Content>
            </ImageBackground>        
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
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);
  
  const styles = StyleSheet.create({
    profilePic:{
        height:width*0.5,
        width:width*0.5,
        borderRadius:width*0.25
    }
})