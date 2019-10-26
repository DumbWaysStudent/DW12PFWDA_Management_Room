import * as types from '../types'

const initialState = {
  updateUser: [],
};

export default function reducerUpdateUser(state = initialState, action) {
  switch (action.type) {
    case `${types.UPDATE_USER}_PENDING`:
        return {
          ...state,
        };
  
      case `${types.UPDATE_USER}_FULFILLED`:
        return {
          ...state,
          updateUser: action.payload.data
        }
  
      case `${types.UPDATE_USER}_REJECTED`:
        return {
          ...state,
        }
    default:
      return state;
  }
}