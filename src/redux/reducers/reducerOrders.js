import * as types from './../types'

const initialState = {
  orders:[],
  queues:[]
};

export default function reducerOrders(state = initialState, action) {
  switch (action.type) {
    case `${types.CHECK_IN}_PENDING`:
        return {
          ...state,
        };
      case `${types.CHECK_IN}_FULFILLED`:
        return {
          ...state,
        };
  
      case `${types.CHECK_IN}_REJECTED`:
        return {
          ...state,
        }    
      case `${types.GET_ORDERS}_PENDING`:
        return {
            ...state,
        };
      case `${types.GET_ORDERS}_FULFILLED`:
      return {
          ...state,
          orders:action.payload.data
        };
      case `${types.GET_ORDERS}_REJECTED`:
      return {
          ...state,
        }
      case `${types.GET_QUEUES}_PENDING`:
        return {
            ...state,
        };
      case `${types.GET_QUEUES}_FULFILLED`:
          let unique = [];
          action.payload.data.forEach(item => {
            if(unique.filter(e=>e.room_id ==item.room_id)==''){
              unique.push(item)
            }
          })
      return {
          ...state,
          queues:unique
        };
      case `${types.GET_QUEUES}_REJECTED`:
      return {
          ...state,
        }
      default:
        return state;
  }
}