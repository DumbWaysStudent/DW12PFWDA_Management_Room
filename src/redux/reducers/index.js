//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from '../../navigators/RootNavigator'
import reducerRooms from './reducerRooms';
import reducerLogin from './reducerLogin';
import reducerEditRoom from './reducerRooms';
import reducerGetCustomers from './reducerCustomers';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  login: reducerLogin,
  rooms:reducerRooms,
  addRoom:reducerRooms,
  EditRoom:reducerEditRoom,
  customers:reducerGetCustomers

})

export default appReducer