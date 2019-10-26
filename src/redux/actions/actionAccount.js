
import * as types from '../types'
import axios from 'axios'
export const handleLogin = (email,password) => ({
    type: types.LOGIN,
    payload: axios({
        method:'POST',
        url:'http://192.168.43.24:9876/api/v1/login',
        data:{
            email,
            password
        }
    })
  });
  export const handleRegister = (email,password) => ({
    type: types.REGISTER,
    payload: axios({
        method:'POST',
        url:'http://192.168.43.24:9876/api/v1/register',
        data:{
            email,
            password
        }
    })
  });
export const handleUpdateUser = (params) => ({
    type: types.UPDATE_USER,
    payload: axios({
        method:'PUT',
        url:`https://wthub.herokuapp.com/api/v1/user/${params.id}`,
        data:{
            name : params.newProfileName,
            image : params.newProfilePic
        },
        headers:{
            Authorization:params.token
        }
    })
});

export const handleAddFavorite = (params) => ({
    type: types.ADD_FAVORITE,
    payload: axios({
        method:'POST',
        url:`https://wthub.herokuapp.com/api/v1/user/${params.userId}/favorites`,
        data:{
            id_webtoon:params.webtoonId,
            id_user:params.userId
        },
        headers:{
            Authorization:params.token
        }
    })
});
  
export const handleDeleteFavorite = (params) => ({
    type: types.DELETE_FAVORITE,
    payload: axios({
        method:'DELETE',
        url:`https://wthub.herokuapp.com/api/v1/user/${params.userId}/favorite?id_webtoon=${params.webtoonId}`,
        headers:{
            Authorization:params.token
        }
    })
});