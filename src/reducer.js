import {
  UPDATE_AUTHORIZATION,
  LOGOUT_USER,
  UPDATE_ROOM_PLAYLIST
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
  playlist: []

}


function reducer(state=defaultState, action){
  console.log(action)
  switch (action.type) {
    case "UPDATE_TRACK_RESULTS":
        return {...state, results: action.payload}
      break;
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

    default:
      return state
  }
}

export default reducer
