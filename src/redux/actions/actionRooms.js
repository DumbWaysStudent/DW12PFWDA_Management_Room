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

export const handleAddRoom = (params) => ({
  type: types.ADD_ROOM,
  payload: axios({
    method:'POST',
    url:'http://192.168.43.24:9876/api/v1/room',
    data:{
      name : params.roomName,
  },
  headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});


export const handleEditRoom = (params) => ({
  type: types.ADD_ROOM,
  payload: axios({
    method:'PUT',
    url:`http://192.168.43.24:9876/api/v1/room/${params.roomId}`,
    data:{
      name : params.roomName,
  },
  headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});
