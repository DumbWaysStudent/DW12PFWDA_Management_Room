import React, {Component} from 'react'
import {TouchableOpacity,View,Dimensions,ImageBackground,StyleSheet,AsyncStorage} from 'react-native'
import {Text,Container,Button}from 'native-base'
import {NavigationEvents, withNavigation} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatGrid } from 'react-native-super-grid';
import * as actionAccount from '../redux/actions/actionAccount'
import { connect } from 'react-redux'

const items = [
  { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
  { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
  { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
  { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
  { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
  { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
  { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
  { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
  { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
];
const {height, width } = Dimensions.get('window');
class Rooms extends Component{
    constructor(props){
        super(props)
        this.state = {
            position : 0,
            interval : null,
            starId:[-1],
        }
    }
    render(){
      const {rooms} = this.props.roomsLocal
      console.log(this.props.roomsLocal.rooms)
      console.log(items.code)
      return (
        <Container>
          <FlatGrid
          itemDimension={130}
          items={rooms}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            
            <View style={[styles.itemContainer, { backgroundColor: 'grey' }]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.name}</Text>
            </View>
            
          )}
          
        />
        <Button block><Text>Add</Text></Button>
        </Container>
        
        
        
      );
      
  }
}
const mapStateToProps = state => {
  return {
    loginLocal: state.login,
    roomsLocal: state.rooms,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddFavorite: (params) => dispatch(actionAccount.handleAddFavorite(params)),
    handleDeleteFavorite: (params) => dispatch(actionAccount.handleDeleteFavorite(params)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Rooms));

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemContainer2: {
    
    marginHorizontal:150,
    height: 50,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
 