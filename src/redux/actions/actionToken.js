
import * as types from '../types'
import {AsyncStorage} from 'react-native'
export const  handleLogin = async (email,password) => ({
    type: types.STORE_TOKEN,
    payload: {
        token: await AsyncStorage.getItem('token')
    }
  });