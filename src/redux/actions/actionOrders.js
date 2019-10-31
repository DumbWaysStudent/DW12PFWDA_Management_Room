
import * as types from '../types'
import axios from 'axios'
import moment from 'moment';
import {url} from '../url'
export const handleCheckIn = (params) => ({
    type: types.CHECK_IN,
    payload: axios({
        method:'POST',
        url:`${url}/orders`,
        data:{
            room_id:params.roomId,
            customer_id:params.customerId,
            duration:params.duration,
            order_end_time: moment().add(params.duration,'minutes').toISOString()
        },
        headers:{
            Authorization:`Bearer ${params.token}`
        }
    })
  });
  export const handleCheckOut = (params) => ({
    type: types.CHECK_OUT,
    payload: axios({
        method:'PUT',
        url:`${url}/order/${params.orderId}`,
        data:{
            is_done:true,
            is_booked:false,
        },
        headers:{
            Authorization:`Bearer ${params.token}`
        }
    })
  });

export const handleGetOrders = (params) => ({
    type: types.GET_ORDERS,
    payload: axios({
        method:'GET',
        url:`${url}/checkin`,
    headers:{
        Authorization:`Bearer ${params.token}`
        }
    })
});

export const handleGetQueues = (params) => ({
    type: types.GET_QUEUES,
    payload: axios({
        method:'GET',
        url:`${url}/queues`,
    headers:{
        Authorization:`Bearer ${params.token}`
        }
    })
});
