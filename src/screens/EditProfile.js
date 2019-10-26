import React, { Component } from 'react'
import { TouchableOpacity, Dimensions, TextInput, AsyncStorage,Text, StyleSheet, Image } from 'react-native'
import { Content, Container,Body,Button,Left,Right,Header} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import * as actionAccount from '../redux/actions/actionAccount'


const { width } = Dimensions.get('window');
class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newProfileName:'',
            isInit:0,
            imageUrl:''
        }
    }

    async componentDidMount(){ 
         
        this.setState({newProfileName:this.props.navigation.getParam('name')})
        const token= await AsyncStorage.getItem('token')
        if(!token) this.props.navigation.navigate('Account')
    }

    async updateProfile(){
        if(this.state.imageUrl=='' ) this.setState({imageUrl:this.props.loginLocal.login.image})
        const token= await AsyncStorage.getItem('token')
        await this.props.handleUpdateUser({
            token:String('Bearer '+token),
            id:this.props.loginLocal.login.id,
            newProfileName:this.state.newProfileName,
            newProfilePic:this.state.imageUrl
        })
        console.log('---------------------------------')
        console.log(this.state.imageUrl)
        this.props.navigation.navigate('Profile',{
            name:this.props.updateUserLocal.updateUser.name,
            image:this.props.updateUserLocal.updateUser.image
        })
    }
    handlerCamera() {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response.uri ;
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source)
                this.setState({
                    imageUrl: source,
                });
            }
        });
    }

    renderProfile() {
        if (this.state.imageUrl == '') {
            return <Image source={{ uri: this.props.navigation.getParam('image') }} style={styles.profilePic} />;
        }
        return <Image source={{uri : this.state.imageUrl}} style={styles.profilePic} />;
    }


    render() {
        console.log(this.props.navigation.getParam('name'))
        const{login}=this.props.loginLocal
        return (
            <Container>
                  <Header transparent>
                    <Left>
                        <Button transparent onPress = {()=>this.props.navigation.goBack()}>
                        <Icon size = {25} name='arrow-left' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Edit Profile</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>this.updateProfile()}>
                        <Icon  size = {25}name='check' color = 'orange'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Body>
                    {this.renderProfile()}
                        <TouchableOpacity onPress={()=>this.handlerCamera()} style={styles.cameraStyle}>
                            <Icon name='camera' size={25} />
                        </TouchableOpacity>
                        <TextInput value={this.state.newProfileName} onChangeText={(e)=>this.setState({newProfileName:e})} style={styles.TextInput}></TextInput>
                    </Body>
                </Content>
            </Container>

        )
    }
}

const mapStateToProps = state => {
    return {
        loginLocal: state.login,
        updateUserLocal: state.updateUser,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        handleUpdateUser: (params) => dispatch(actionAccount.handleUpdateUser(params)),
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfile);

const styles = StyleSheet.create({
    cameraStyle: {
        marginTop: -width*0.07,
        marginLeft: width*0.4
    },
    TextInput : { 
        borderWidth: 2, 
        width: width * 0.6, 
        textAlign: 'center', 
        marginTop: 20 },

    profilePic:{
        height:width*0.5,
        width:width*0.5,
        borderRadius:width*0.25
    }
});