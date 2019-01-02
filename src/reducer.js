import {
  UPDATE_AUTHORIZATION,
  LOGOUT_USER,
  UPDATE_ROOM_PLAYLIST,
  UPDATE_CURRENT_USERS
} from './actions/types'

const defaultState =  {
  isLoading: false,
  results: [],
  value: '',
  isLoggedIn: false,
  user: {spotify_url: null, display_name: null, uri: null, access_token: null, profile_image: null, username: null, user_id: null},
  error: false,
  loggedInUsers:[],
  selectedSong:{},
  playlist: [],
  users:[]

}


function reducer(state=defaultState, action){
  switch (action.type) {
    case "UPDATE_TRACK_RESULTS":
      console.log('updating track results with', action.payload)
        return {...state, results: action.payload}
      case (UPDATE_AUTHORIZATION):
            return Object.assign({}, state, {user: action.payload.user, isLoggedIn: true})
      case (LOGOUT_USER):
            localStorage.removeItem('jwt')
            return Object.assign({}, state, {
              isLoggedIn: false,
              user: {spotify_url: null, display_name: null, uri: null, access_token: null, profile_image: null, username: null, user_id: null}
            })
        case (UPDATE_ROOM_PLAYLIST):
                    return Object.assign({}, state, {playlist: action.payload.playlist})
      case (UPDATE_CURRENT_USERS):
                    return Object.assign({}, state, {users: action.payload.users})

    default:
      return state
  }
}

export default reducer
