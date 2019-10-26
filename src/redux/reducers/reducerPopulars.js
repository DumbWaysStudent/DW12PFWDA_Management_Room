import * as types from '../types'

const initialState = {
  populars:[]
};

export default function reducerPopulars(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_POPULARS}_PENDING`:
        return {
          ...state,
        };
  
      case `${types.GET_POPULARS}_FULFILLED`:
        return {
          ...state,
          populars: action.payload.data
        };
  
      case `${types.GET_POPULARS}_REJECTED`:
        return {
          ...state
        }
    default:
      return state;
  }
}