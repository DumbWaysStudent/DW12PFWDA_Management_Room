import React, {Component} from 'react'
import {StyleSheet,AsyncStorage} from 'react-native'
import {Text,Content,Container,ListItem,Left, Thumbnail, Body,Right,Button, Label,View,Input,List}from 'native-base'
import {Dummy} from '../components/Dummy'
import HeaderEdit from '../components/Headers/HeaderEdit'


const data = [...Dummy.data]

class EditWebtoon extends Component{
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
        <HeaderEdit title = 'Edit Webtoon' navigation = {this.props.navigation}/>
        <Content>
            <Label style = {{marginHorizontal : 40,marginTop : 10}}>Title</Label>
            <View style = {{flexDirection : 'row',borderWidth : 2, marginHorizontal : 40,marginVertical : 10}}>
                <Input value = {this.props.navigation.getParam('webtoonId')}/>
            </View>
            {data.map((item, index) => {
              return (
              <List key = {index}>
                <ListItem thumbnail onPress = {()=>this.props.navigation.navigate('EditEpisode',{
                  episode :`Episode ${data.length-index}`,
                  url : item.url,navigation : this.props.navigation
                  })}>
                    <Left>
                    <Thumbnail square source={{uri: item.url}}/>
                    </Left>   
                    <Body>
                        <Text>Episode {data.length-index}</Text>
                        <Text note numberOfLines={1}>Lorem Ipsum</Text>
                    </Body>
                    <Right>
                        <Button transparent></Button>
                      </Right>
                </ListItem>
              </List>
              )
            })}
            <Button  transparent style = {styles.Button} onPress = {()=>this.props.navigation.navigate('CreateEpisode')} block bordered><Text style = {{color : 'black'}}>+ Add Episode</Text></Button>  
            <Button block danger style = {styles.Button}><Text>Delete Webtoon</Text></Button>                  
        </Content>
    </Container> 
    )
  }
}
export default EditWebtoon
const styles = StyleSheet.create({
  Button : {
    marginBottom : 20,
    marginHorizontal : 80,
    borderWidth : 2,
    borderColor : 'black'
  },

})