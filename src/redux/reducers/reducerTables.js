import * as types from '../types'

const initialState = {
  tables:[],
  checkIn:[]
};

export default function reducerTables(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_TABLES}_PENDING`:
        return {
          ...state,
        };
      case `${types.GET_TABLES}_FULFILLED`:
        return {
          ...state,
          tables: action.payload.data.result
        };
  
      case `${types.GET_TABLES}_REJECTED`:
        return {
          ...state,
        }

      case `${types.ADD_TABLE}_PENDING`:
      return {
          ...state,
      };

      case `${types.ADD_TABLE}_FULFILLED`:
      return {
          ...state,
      };

      case `${types.ADD_TABLE}_REJECTED`:
      return {
          ...state,
          }    

      case `${types.EDIT_TABLE}_PENDING`:
      return {
          ...state,
      };

      case `${types.EDIT_TABLE}_FULFILLED`:
      return {
          ...state,
      };

      case `${types.EDIT_TABLE}_REJECTED`:
      return {
          ...state,
          }   

      default:
        return state;
  }
}