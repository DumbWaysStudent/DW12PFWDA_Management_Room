import * as types from './../types'
import axios from 'axios'


export const handleGetWebtoons = () => ({
  type: types.GET_WEBTOONS,
  payload: axios.get('https://wthub.herokuapp.com/api/v1/webtoons') 
});

export const handleGetRecent = () => ({
  type: types.GET_RECENT,
  payload: axios.get('https://wthub.herokuapp.com/api/v1/recent')
});

export const handleGetPopulars = () => ({
  type: types.GET_POPULARS,
  payload: axios.get('https://wthub.herokuapp.com/api/v1/populars')
});

export const handleGetEpisodes = () => ({
  type: types.GET_EPISODES,
  payload: axios.get('https://wthub.herokuapp.com/api/v1/episodes')
});

export const handleGetDetailEpisodes = (params) => ({
  type: types.GET_DETAIL_EPISODES,
  payload: axios.get(`https://wthub.herokuapp.com/api/v1/webtoon/${params.id_webtoon}/episode/${params.episode}`)
});

export const handleGetFavorites = (params) => ({
  type: types.GET_FAVORITES,
  payload: axios.get(`https://wthub.herokuapp.com/api/v1/webtoons?id_user=${params.id}`)
});
