import * as types from '../types'

const initialState = {
  detailEpisodes:[]
};

export default function reducerDetailEpisodes(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_DETAIL_EPISODES}_PENDING`:
        return {
          ...state,
        };
  
      case `${types.GET_DETAIL_EPISODES}_FULFILLED`:
        console.log(action.payload)
        return {
          ...state,
          detailEpisodes: action.payload.data
        };
  
      case `${types.GET_DETAIL_EPISODES}_REJECTED`:
        return {
          ...state,
        }
    default:
      return state;
  }
}