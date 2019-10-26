import React, { Component } from 'react'
import Login from '../screens/Login'
import Loading from '../screens/Loading'
import Episode from '../screens/Episode'
import Register from '../screens/Register'
import Rooms from '../screens/Rooms'
import Creation from '../screens/Creation'
import Details from '../screens/Details'
import Favorites from '../screens/Favorites'
import Profile from '../screens/Profile'
import EditProfile from '../screens/EditProfile'
import EditWebtoon from '../screens/EditWebtoon'
import EditEpisode from '../screens/EditEpisode'
import CreateWebtoon from '../screens/CreateWebtoon'
import CreateEpisode from '../screens/CreateEpisode'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'


const BottomStack = createBottomTabNavigator({
  Rooms: Rooms,
  Favorites: Favorites,
  Profile: Profile
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Rooms') {
        iconName = `home`;
      } else if (routeName === 'Favorites') {
        iconName = `star`;
      }
      else iconName = `user`;

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Icon name={iconName} size={25} color={tintColor} />;
    },
    // tabBarOnPress: ({ navigation, defaultHandler }) => {
    //   // if(navigation.state.index > 0) {
    //   //   navigation.dispatch(StackActions.popToTop());
    //   // }
    //   // defaultHandler();
    //   console
    // },
  }
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
    inactiveTintColor: 'black',
  },
}
)

const HomeStack = createStackNavigator({
  BottomStack : {screen: BottomStack,navigationOptions : ()=>({header : null})},
  Details : {screen : Details, navigationOptions : ()=>({header : null})},
  Episode : {screen : Episode, navigationOptions : ()=>({header : null})},
  EditProfile : {screen : EditProfile, navigationOptions : ()=>({header : null})},
  Creation : {screen : Creation, navigationOptions : ()=>({header : null})},
  EditWebtoon : {screen : EditWebtoon, navigationOptions : ()=>({header : null})},
  EditEpisode : {screen : EditEpisode, navigationOptions : ()=>({header : null})},
  CreateWebtoon : {screen : CreateWebtoon, navigationOptions : ()=>({header : null})},
  CreateEpisode : {screen : CreateEpisode, navigationOptions : ()=>({header : null})}
},{initialRouteName : 'BottomStack'}
)
const AccountStack = createStackNavigator({
  Login : {screen : Login, navigationOptions : ()=>({header : null})},
  Register : {screen : Register, navigationOptions : ()=>({header : null})}
},{initialRouteName : 'Login'}
)

const RootNavigator = createSwitchNavigator({
  
  Account : Login,
  Loading: Loading,
  Home: HomeStack,   
})

export default createAppContainer(RootNavigator);
