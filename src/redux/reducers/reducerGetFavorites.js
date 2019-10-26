import * as types from '../types'

const initialState = {
  favorites:[]
};

export default function reducerFavorites(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_FAVORITES}_PENDING`:
        return {
          ...state,
        };
  
      case `${types.GET_FAVORITES}_FULFILLED`:
        return {
          ...state,
          favorites: action.payload.data
        };
  
      case `${types.GET_FAVORITES}_REJECTED`:
        return {
          ...state
        }
    default:
      return state;
  }
}