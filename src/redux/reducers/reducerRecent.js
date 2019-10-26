import * as types from './../types'

const initialState = {
  recent:[]
};

export default function reducerRecent(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_RECENT}_PENDING`:
        return {
          ...state,
        };
  
      case `${types.GET_RECENT}_FULFILLED`:
        return {
          ...state,
          recent: action.payload.data
        };
  
      case `${types.GET_RECENT}_REJECTED`:
        return {
          ...state,
        }
    default:
      return state;
  }
}