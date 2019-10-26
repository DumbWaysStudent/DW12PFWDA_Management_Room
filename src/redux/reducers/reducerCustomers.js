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
          customers: action.payload.data.result
        }
  
      case `${types.GET_CUSTOMERS}_REJECTED`:
        return {
          ...state,
        }

        
        case `${types.ADD_CUSTOMER}_PENDING`:
        return {
            ...state,
        };
    
        case `${types.ADD_CUSTOMER}_FULFILLED`:
        return {
            ...state,
        }
    
        case `${types.ADD_CUSTOMER}_REJECTED`:
        return {
            ...state,
        } 
        
        case `${types.EDIT_CUSTOMER}_PENDING`:
            return {
                ...state,
            };
        
            case `${types.EDIT_CUSTOMER}_FULFILLED`:
            return {
                ...state,
            }
        
            case `${types.EDIT_CUSTOMER}_REJECTED`:
            return {
                ...state,
            }
    default:
      return state;
  }
}