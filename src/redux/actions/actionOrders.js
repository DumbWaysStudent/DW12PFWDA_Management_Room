
import * as types from '../types'
import axios from 'axios'
import moment from 'moment';
export const handleCheckIn = (params) => ({
    type: types.ADD_ORDER,
    payload: axios({
        method:'POST',
        url:'http://192.168.43.24:9876/api/v1/orders',
        data:{
            room_id:params.roomId,
            customer_id:params.customerId,
            duration:params.duration,
            order_end_time: moment().add(params.duration, 'minutes').calendar()
        },
        headers:{
            Authorization:`Bearer ${params.token}`
        }
    })
  });