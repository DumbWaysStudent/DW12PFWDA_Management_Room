import React, { Component } from 'react'
import Login from '../screens/Login'
import Splash from '../screens/Splash'
import Loading from '../screens/Loading'
import EditProfile from '../screens/EditProfile'
import Tables from '../screens/Tables'
import Orders from '../screens/Orders'
import Customers from '../screens/Customers'
import Profile from '../screens/Profile'
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Text, View, Image, ScrollView, StyleSheet,Dimensions} from 'react-native';
import {createAppContainer,SafeAreaView,} from 'react-navigation';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Button} from 'native-base'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

const {height,width}=Dimensions.get('window')
const BottomStack = createBottomTabNavigator({
  Tables: Tables,
  Orders: Orders,
  Customers: Customers
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Tables') {
        iconName = `columns`;
      } 
      else if (routeName === 'Orders') {
        iconName = `scroll`;
      }
      else if (routeName === 'Customers') {
        iconName = `users`;
      }
      else iconName = `cog`;
      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Icon name={iconName} size={25} color={tintColor} />;
    },
  }
  ),
  tabBarOptions: {
    activeTintColor: '#00b5b5',
    inactiveTintColor: 'black',
  },
})
const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={{alignItems:'center',marginTop:height*0.05,marginBottom:height*0.03}}>
      <Image
        style={styles.image}
        source={require('../assets/logo.png')}
      />
      <Text style={{fontSize:18,textAlign:'center'}}>Polley Pool Arena</Text>
      </View>

      <DrawerItems {...props} />
      <View style={{marginLeft:width*0.045,flexDirection:'row'}}>
      <Button transparent onPress={()=>props.navigation.navigate("Account")}>
      <Icon color="#615c5c" size={24}  name ="sign-out-alt"/>
      <Text style={{color:'black',fontSize:14,fontWeight:'bold',marginLeft:width*0.09}}>Sign Out</Text>
      </Button>
      </View>
    </SafeAreaView>
  </ScrollView>
);

const ProfileStack = createStackNavigator({
  Profile:{screen:Profile,navigationOptions: {
    header: () => null
  }},
  EditProfile:{screen:EditProfile,navigationOptions: {
    header: () => null
  }},
},{initialRouteName:'Profile'}
)

const Navigator = createDrawerNavigator({
  BottomStack:{screen:BottomStack,navigationOptions: {
    drawerLabel: () => null,
    drawerIcon: () => null
  }},
  ProfileStack:{screen:ProfileStack,navigationOptions: {
    title: 'My Profile',
    drawerIcon: ({ focused }) => (
      <Icon name="user" size={18} color={focused ? 'blue' : 'black'} />
    ),
  }},
  },
  {
    drawerType: 'slide',
    // drawerPosition: 'right',
    drawerWidth: width*0.6,
    drawerBackgroundColor: '#f2fcfc',
    contentComponent: CustomDrawerContentComponent
  },
)

const RootNavigator = createAnimatedSwitchNavigator({
  Loading: Loading,
  Account : Login,
  Home: Navigator,
  Splash:Splash
  },{
    // The previous screen will slide to the bottom while the next screen will fade in
    transition:
    (
      <Transition.Sequence>
        <Transition.Out
          type="slide-bottom"
          durationMs={500}
          interpolation="easeIn"
        />
        <Transition.In type="slide-top" durationMs={500} />
      </Transition.Sequence>
    )
    ,initialRouteName:"Splash"
  }

)

export default createAppContainer(RootNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#f2fcfc',
    padding: 8,
  },
  image: {
    flex: 1,
    height: width*0.4,
    width:width*0.4,
    borderRadius:width*0.2,
  },
});