import * as types from './../types'

const initialState = {
  addFavorite:[]
};

export default function reducerAddFavorite(state = initialState, action) {
  switch (action.type) {
    case `${types.ADD_FAVORITE}_PENDING`:
        return {
          ...state,
        };
  
      case `${types.ADD_FAVORITE}_FULFILLED`:
        return {
          ...state,
          addFavorite: action.payload.data
        };
  
      case `${types.ADD_FAVORITE}_REJECTED`:
        return {
          ...state,
        }
    default:
      return state;
  }
}