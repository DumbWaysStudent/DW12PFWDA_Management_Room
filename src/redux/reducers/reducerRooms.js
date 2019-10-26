import * as types from './../types'

const initialState = {
  rooms:[],
  addRoom:[]
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ROOMS}_PENDING`:
        return {
          ...state,
        };
      case `${types.GET_ROOMS}_FULFILLED`:
        return {
          ...state,
          rooms: action.payload.data.result
        };
  
      case `${types.GET_ROOMS}_REJECTED`:
        return {
          ...state,
        }

      case `${types.ADD_ROOM}_PENDING`:
      return {
          ...state,
      };

      case `${types.ADD_ROOM}_FULFILLED`:
      return {
          ...state,
          addRoom: action.payload.data.result
      };

      case `${types.ADD_ROOM}_REJECTED`:
      return {
          ...state,
          }    

      case `${types.EDIT_ROOM}_PENDING`:
      return {
          ...state,
      };

      case `${types.EDIT_ROOM}_FULFILLED`:
      return {
          ...state,
      };

      case `${types.EDIT_ROOM}_REJECTED`:
      return {
          ...state,
          }   
      default:
        return state;
  }
}