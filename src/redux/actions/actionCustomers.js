import * as types from './../types'
import axios from 'axios'


export const handleGetCustomers = (params) => ({
  type: types.GET_CUSTOMERS,
  payload: axios({
    method:'GET',
    url:'http://192.168.43.24:9876/api/v1/customers',
    headers:{
      Authorization:`Bearer ${params.token}`
  }
  })
});

export const handleAddCustomer = (params) => ({
    type: types.ADD_CUSTOMER,
    payload: axios({
      method:'POST',
      url:'http://192.168.43.24:9876/api/v1/customer',
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

