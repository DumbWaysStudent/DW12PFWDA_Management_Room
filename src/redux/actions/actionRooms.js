import * as types from './../types'
import axios from 'axios'


export const handleGetRooms = (params) => ({
  type: types.GET_ROOMS,
  payload: axios({
    method:'GET',
    url:'http://192.168.43.24:9876/api/v1/rooms',
    headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});
