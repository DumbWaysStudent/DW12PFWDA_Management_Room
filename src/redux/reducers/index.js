//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from '../../navigators/RootNavigator'
import reducerRooms from '../reducers/reducerRooms';
import reducerLogin from './reducerLogin';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  login: reducerLogin,
  rooms:reducerRooms

})

export default appReducer