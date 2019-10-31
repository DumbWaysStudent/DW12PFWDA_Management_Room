import * as types from './../types'
import axios from 'axios'
import {url} from '../url'


export const handleGetRooms = (params) => ({
  type: types.GET_ROOMS,
  payload: axios({
    method:'GET',
    url:`${url}/rooms`,
    headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});

export const handleAddRoom = (params) => ({
  type: types.ADD_ROOM,
  payload: axios({
    method:'POST',
    url:`${url}/room`,
    data:{
      name : params.roomName,
  },
  headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});


export const handleEditRoom = (params) => ({
  type: types.EDIT_ROOM,
  payload: axios({
    method:'PUT',
    url:`${url}/room/${params.roomId}`,
    data:{
      name : params.roomName,
  },
  headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});


