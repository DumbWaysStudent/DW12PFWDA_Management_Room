import React, {Component} from 'react'
import {StyleSheet,AsyncStorage} from 'react-native'
import {Text,Content,Container,ListItem,Left, Thumbnail, Body,Header,Right,Button, Label,View,Input,List}from 'native-base'
import {Dummy} from '../components/Dummy'
import HeaderEdit from '../components/Headers/HeaderEdit'
import ImagePicker from 'react-native-image-picker';




const data = [...Dummy.data]

class EditEpisode extends Component{
  async componentDidMount(){
    const token= await AsyncStorage.getItem('token')
    if(!token) this.props.navigation.navigate('Account')
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
            const source = { uri: response.uri };

            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
                imageUrl: source,
            });
        }
    });
}
  render(){
    return(
      <Container>
        <HeaderEdit title = 'Edit Episode' navigation = {this.props.navigation}/>
        <Content>
            <Label style = {{marginHorizontal : 20,marginTop : 10}}>Title</Label>
            <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                <Input value = {this.props.navigation.getParam('episode')}/>
            </View>
              <List>
                <ListItem thumbnail>
                    <Left>
                    <Thumbnail square source={{uri: this.props.navigation.getParam('url')}}/>
                    </Left>   
                    <Body>
                        <Text>{this.props.navigation.getParam('episode')}</Text>
                        <Text note numberOfLines={1}>Lorem Ipsum</Text>
                    </Body>
                    <Right>
                      </Right>
                </ListItem>
              </List>           
            <Button onPress = {()=>this.handlerCamera()} transparent style = {styles.Button} block bordered><Text style = {{color : 'black'}}>+ Image</Text></Button>  
            <Button block danger style = {styles.Button}><Text>Delete Episode</Text></Button>                  
        </Content>
    </Container> 
    )
  }
}
export default EditEpisode
const styles = StyleSheet.create({
  Button : {
    marginBottom : 20,
    marginHorizontal : 80,
    borderWidth : 2,
    borderColor : 'black'
  },

})