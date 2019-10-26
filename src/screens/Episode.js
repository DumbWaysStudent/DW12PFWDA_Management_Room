import React, {Component} from 'react'
import {Image,Dimensions,View,Text,AsyncStorage} from 'react-native'
import {Content,Container,List}from 'native-base'
import HeaderShare from '../components/Headers/HeaderShare'
import { connect } from 'react-redux'
import * as actionWebtoons from '../redux/actions/actionWebtoons'

 


const { width,height } = Dimensions.get('window');

class Episode extends Component{ 
    componentDidMount=async()=>{
        const token= await AsyncStorage.getItem('token')
        if(!token) this.props.navigation.navigate('Account')
        await this.props.handleGetDetailEpisodes({
            id_webtoon:this.props.navigation.getParam('id_webtoon'),
            episode:this.props.navigation.getParam('episode')
        })
    }
    render(){
        console.log(this.props.navigation.getParam('episode'))
        const {detailEpisodes}=this.props.detailEpisodesLocal
        console.log(detailEpisodes)
        const webtoonTitle = this.props.navigation.getParam('title')
        return(
            <Container>
                <Content>
                    <HeaderShare title = {webtoonTitle} navigation = {this.props.navigation}/>
                    {detailEpisodes.length!==0 ? 
                    detailEpisodes.map((item, index) => {
                        return (
                        <List key = {index}>
                            <Image style = {{height,width}} source ={{uri : item.image}}></Image>
                        </List>
                        )
                    })
                        :
                    <View style={{alignItems:'center',justifyContent:'center',marginTop:height*0.1}}>
                    <Image style={{height:height*0.2,width:width*0.3}} source={require('../assets/nocontent.gif')}/>
                    <Text>Coming Soon</Text>
                    </View>
                    }
                    
                </Content>
            </Container>            
        )
    }
}

const mapStateToProps = state => {
    return {
        detailEpisodesLocal: state.detailEpisodes
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleGetDetailEpisodes: (params) => dispatch(actionWebtoons.handleGetDetailEpisodes(params)),
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Episode);