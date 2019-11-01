import * as types from '../types'
import axios from 'axios'
import {url} from '../url'


export const handleGetTables= (params) => ({
  type: types.GET_TABLES,
  payload: axios({
    method:'GET',
    url:`${url}/tables`,
    headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});

export const handleAddTable =(params) => ({
  type: types.ADD_TABLE,
  payload: axios({
    method:'POST',
    url:`${url}/table`,
    data:{
      name : params.tableName,
  },
  headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});


export const handleEditTable= (params) => ({
  type: types.EDIT_TABLE,
  payload: axios({
    method:'PUT',
    url:`${url}/TABLE/${params.tableId}`,
    data:{
      name : params.tableName,
  },
  headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});


