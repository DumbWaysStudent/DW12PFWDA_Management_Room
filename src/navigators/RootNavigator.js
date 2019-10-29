import React, { Component } from 'react'
import Login from '../screens/Login'
import Loading from '../screens/Loading'
import EditProfile from '../screens/EditProfile'
import Rooms from '../screens/Rooms'
import EditCustomer from '../screens/EditCustomer'
import Customers from '../screens/Customers'
import Profile from '../screens/Profile'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'


const BottomStack = createBottomTabNavigator({
  Rooms: Rooms,
  Customers: Customers,
  Profile: Profile
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Rooms') {
        iconName = `building`;
      } else if (routeName === 'Customers') {
        iconName = `users`;
      }
      else iconName = `cog`;

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
  EditProfile : {screen : EditProfile, navigationOptions : ()=>({header : null})},
  EditCustomer : {screen : EditCustomer, navigationOptions : ()=>({header : null})},

},{initialRouteName : 'BottomStack'}
)

const RootNavigator = createSwitchNavigator({
  
  Account : Login,
  Loading: Loading,
  Home: HomeStack,   
})

export default createAppContainer(RootNavigator);
