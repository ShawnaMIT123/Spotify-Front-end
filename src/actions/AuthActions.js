import { ApiUrl } from '../components/Assets/ApiUrl'
import { headers }  from '../auth/AuthHeaders'
import {
  UPDATE_AUTHORIZATION,
  LOGOUT_USER,
  UPDATE_ROOM_PLAYLIST
} from './types'

// export function fetchAuthorization(code) {
//   return (dispatch) => {
//     // return fetch(`${ApiUrl}spotifyusers?code=${code}`, {
//       method: 'POST',
//       headers: headers()
//     })
//     .then(response => response.json())
//     .then(json => {
//       // Save JWT in local storage, then update auth in store
//       localStorage.setItem('jwt', json.jwt)
//       return dispatch({type: UPDATE_AUTHORIZATION, payload: {user:json.user}})
//     })
//   }
// }

export function currentUser(){
  return (dispatch) => {
    return fetch(`${ApiUrl}auth`, {
      headers: headers()
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if (!json.error){
        return dispatch({type: UPDATE_AUTHORIZATION, payload: {user: json}})
      }
    })
  }
}
export function getRoomTracks(){
  return (dispatch) => {
    return fetch(`${ApiUrl}rooms`, {
      headers: headers()
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if (!json.error){
        return dispatch({type: UPDATE_ROOM_PLAYLIST, payload: {playlist: json}})
      }
    })
  }
}

export function logoutUser(){
  return {type: LOGOUT_USER}
}
