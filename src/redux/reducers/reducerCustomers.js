import * as types from '../types'

const initialState = {
  customers: []
};

export default function reducerCustomers(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_CUSTOMERS}_PENDING`:
        return {
          ...state,
        };
  
      case `${types.GET_CUSTOMERS}_FULFILLED`:
        return {
          ...state,
          GET_CUSTOMERS: action.payload.data.result
        }
  
      case `${types.GET_CUSTOMERS}_REJECTED`:
        return {
          ...state,
        }
    default:
      return state;
  }
}