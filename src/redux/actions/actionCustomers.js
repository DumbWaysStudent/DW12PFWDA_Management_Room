import * as types from './../types'
import axios from 'axios'
import {url} from '../url'

export const handleGetCustomers = (params) => ({
  type: types.GET_CUSTOMERS,
  payload: axios({
    method:'GET',
    url:`${url}/customers`,
    headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});

export const handleAddCustomer = (params) => ({
    type: types.ADD_CUSTOMER,
    payload: axios({
      method:'POST',
      url:`${url}/customer`,
      data:{
        name : params.name,
        identity_number:params.idNumber,
        phone_number:params.phoneNumber
    },  
      headers:{
        Authorization:`Bearer ${params.token}`
    }
    })
  });

  export const handleEditCustomer = (params) => ({
    type: types.EDIT_CUSTOMER,
    payload: axios({
      method:'PUT',
      url:`${url}/customer/${params.id}`,
      data:{
        name : params.name,
        identity_number:params.idNumber,
        phone_number:params.phoneNumber
    },
    headers:{
        Authorization:`Bearer ${params.token}`
    }
    })
  });
