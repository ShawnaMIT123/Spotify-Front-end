import React from 'react'
import { List } from 'semantic-ui-react'
import TrackItem from './TrackItem.js'



const TrackList = (props) => {

  const renderTrack = (tracks) => {
    return tracks.map(track => {
      return <TrackItem key={track.id} track={track} />
    })
  }

  return(
  <List divided relaxed>
    {renderTrack(props.appState.playlistSongs)}
  </List>)
}

export default TrackList
