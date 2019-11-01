//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from '../../navigators/RootNavigator'
import reducerTables from './reducerTables';
import reducerAccount from './reducerAccount';
import reducerGetCustomers from './reducerCustomers';
import reducerGetOrders from './reducerOrders';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router:reducerRouter,
  login: reducerAccount,
  tables:reducerTables,
  customers:reducerGetCustomers,
  orders:reducerGetOrders
})

export default appReducer