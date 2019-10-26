import * as types from './../types'

const initialState = {
  episodes:[]
};

export default function reducerEpisodes(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_EPISODES}_PENDING`:
        return {
          ...state,
        };
  
      case `${types.GET_EPISODES}_FULFILLED`:
        return {
          ...state,
          episodes: action.payload.data
        };
  
      case `${types.GET_EPISODES}_REJECTED`:
        return {
          ...state,
        }
    default:
      return state;
  }
}