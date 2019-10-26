//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from '../../navigators/RootNavigator'
import reducerRooms from './reducerRooms';
import reducerLogin from './reducerLogin';
import reducerGetCustomers from './reducerCustomers';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router:reducerRouter,
  login: reducerLogin,
  rooms:reducerRooms,
  customers:reducerGetCustomers

})

export default appReducer