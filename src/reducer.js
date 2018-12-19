const defaultState =  {
  isLoading: false,
  results: [],
  value: ''
}


function reducer(state=defaultState, action){
  console.log(action)
  switch (action.type) {
    case "UPDATE_TRACK_RESULTS":
        return {...state, results: action.payload}
      break;
    default:
      return state
  }
}

export default reducer
