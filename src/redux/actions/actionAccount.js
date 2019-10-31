
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