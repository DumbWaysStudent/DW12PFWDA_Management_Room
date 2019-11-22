
import * as types from '../types'
import axios from 'axios'
import {url} from '../url'
  export const handleLogin = (email,password) => ({
    type: types.LOGIN,
    payload: axios({
        method:'POST',
        url:`${url}/login`,
        data:{
            email,
            password
        }
    })
  });

  export const handleStoreData = (data) => ({
    type: types.STORE_DATA,
    payload: data
  })

  export const handleUpdateUser = (params) => ({
    type: types.UPDATE_USER,
    payload: axios({
        method:'PUT',
        url:`${url}/user?userId=${params.id}`,
        data:{
            email:params.email,
            image:params.image
        },
        headers:{
          Authorization:`Bearer ${params.token}`
      }
    })
  });