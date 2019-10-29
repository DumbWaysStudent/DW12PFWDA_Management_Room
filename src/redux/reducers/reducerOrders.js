import * as types from './../types'

const initialState = {
  orders:[],
};

export default function reducerOrders(state = initialState, action) {
  switch (action.type) {
    case `${types.ADD_ORDER}_PENDING`:
        return {
          ...state,
        };
      case `${types.ADD_ORDER}_FULFILLED`:
        return {
          ...state,
          orders: action.payload.data.result
        };
  
      case `${types.ADD_ORDER}_REJECTED`:
        return {
          ...state,
        }
      default:
        return state;
  }
}