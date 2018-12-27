import React, { Component } from 'react';
import {connect} from 'react-redux'


class WebPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
      uris: [],
      startTime: null
    };



    this.playerCheckInterval = null;

  }
  componentDidMount(){

    fetch("http://localhost:3000/api/v1/users/1", {
      method: 'GET', // or 'PUT'
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      this.setState({token: response["access_token"]
         }, () => {
        this.handleLogin()
      })
    })
  }
  // 'BQC3d17lk_YbAr3sNN5IBMENQuvhqwiChcQfrhuhm8Y6IdAUwrIYDikRYolHJCi37eJL85-K-Dy8sIWVAOlRaUQaK0S7Wc88PF28feUklsqKU89rl3NQhMJoCpBFJTTsETGKe3dTLxmzqkL9wwDtOspDfObQ8PcnDptCJ6pL'

  handleLogin() {
    if (this.state.token !== "") {
      this.setState({ loggedIn: true });
      // check every second for the player.
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
      // this.checkForPlayer()
    }
  }

  checkForPlayer() {
    const { token } = this.state;

    if (window.Spotify) {
           clearInterval(this.playerCheckInterval);

      this.player = new window.Spotify.Player({
        name: "Shawna's New Spotify Player",
        getOAuthToken: cb => { cb(token); },
      });

       this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
  }


  createEventHandlers() {

    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });

    // Playback status updates
    // this.player.on('player_state_changed', state => this.onStateChanged(state));
    this.player.on('player_state_changed', state => this.settingStateofNewSong(state));


     // this.player.on('ready', data => {
     //   console.log(data)
     //   let { device_id } = data;
     //   console.log("Let the music play on!");
     //   this.setState({ deviceId: device_id });
     // });
    // Ready
    this.player.on('ready', async data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
      this.playFirstSong();
    });


  }



  transferPlaybackHere() {
  const { deviceId, token } = this.state;
  fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "device_ids": [ deviceId ],
      "play": true,
    }),
  });
  this.getCurrentStateEverySecond();
}

onStateChanged(state) {
  // if we're no longer listening to music, we'll get a null state.


  console.log(state)
  if (state !== null) {
    let {
          current_track: currentTrack,
        } = state.track_window;
      let {
              position,
              duration,
            } = state;

    const trackName = currentTrack.name;
    const albumName = currentTrack.album.name;
    const artistName = currentTrack.artists
      .map(artist => artist.name)
      .join(", ");
    const playing = !state.paused;
    this.setState({
      position,
      duration,
      trackName,
      albumName,
      artistName,
      playing

    });
  }
}

settingStateofNewSong(state) {
  // if we're no longer listening to music, we'll get a null state.

////first song to change to after playback transfer
if ((state !== null && state.position == 0 && state.paused == false && state.duration == this.state.duration) || (state !== null && state.position == 0 && state.playing == true) || (state !== null && state.position == 0 && this.state.duration == 0)){
  console.log("duration", this.state.duration)

  let {
        current_track: currentTrack,
      } = state.track_window;
    let {
            position,
            duration,
          } = state;

  const trackName = currentTrack.name;
  const albumName = currentTrack.album.name;
  const artistName = currentTrack.artists
    .map(artist => artist.name)
    .join(", ");
  const playing = !state.paused;
  console.log("running settingStateofNewSongFirstSong", state)
  this.setState({
    position,
    duration,
    trackName,
    albumName,
    artistName,
    playing

  }, ()=>{
    console.log("settingStateofNewSong", this.state)

        setTimeout(() => this.playFirstSong(), 3000 + duration)
        setTimeout(() => this.deleteFinishedSong(), duration)
  });

}
////paused state after playback transfer
else if (state !== null) {
    let {
          current_track: currentTrack,
        } = state.track_window;
      let {
              position,
              duration,
            } = state;

    const trackName = currentTrack.name;
    const albumName = currentTrack.album.name;
    const artistName = currentTrack.artists
      .map(artist => artist.name)
      .join(", ");
    const playing = !state.paused;
    this.setState({
      position,
      duration,
      trackName,
      albumName,
      artistName,
      playing

    });
    console.log("first playback", this.state)
  }
}

playFirstSong = () => {
  console.log("playlist pressed")
  console.log("appState", this.props.appstate)
  const { deviceId, token, uris} = this.state;

  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({

      "uris": [this.props.appstate.playlistSongs[0].spotify_url]
    })
  })
  .then(response => {
    console.log('Success:', JSON.stringify(response))
    this.setState({startTime: Date.now()}, ()=>{
      fetch(`http://localhost:3000/api/v1/tracks/${this.props.appstate.playlistSongs[0].id}`, {
        method: 'PATCH', // or 'PUT'
        body: JSON.stringify({start_time : this.state.startTime}) , // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
    });





    })
  .catch(error => console.error('Error:', error));

}

deleteFinishedSong = () => {
  console.log("playlist pressed")
  console.log("appState", this.props.appstate)
  const { deviceId, token, uris} = this.state;




  fetch(`http://localhost:3000/api/v1/tracks/${this.props.appstate.playlistSongs[0].id}`, {
    method: 'DELETE'// or 'PUT'
  })
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));

}

playRoomPlaylist() {
  console.log("playlist pressed")
  console.log("appState", this.props.appstate)
  const { deviceId, token, uris } = this.state;


  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "uris": this.props.appstate.playlistSongs.map((uriobject)=>{
        return uriobject.spotify_url})
    })
  })
  .then(result => result.json())
  .then((tracks) =>{

    console.log(tracks)
  })

}

getCurrentPlayerState(){
  this.player.getCurrentState().then(state => {

    if (!state) {
      console.error('User is not playing music through the Web Playback SDK');
      return;
    } else {
      let {
            current_track: currentTrack,
          } = state.track_window;
        let {
                position,
                duration,
              } = state;


          const trackName = currentTrack.name;
          const albumName = currentTrack.album.name;
          const artistName = currentTrack.artists
            .map(artist => artist.name)
            .join(", ");
          const playing = !state.paused;
          this.setState({
            position,
            duration,
            trackName,
            albumName,
            artistName,
            playing

          });
           // console.log(this.state)
        }
    })
}

getCurrentStateEverySecond() {

    setInterval(() => this.getCurrentPlayerState(), 1000);

}






  render() {

    const {
      token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing,
    } = this.state;

  return (
        <div>
              <p>Artist: {artistName}</p>
              <p>Track: {trackName}</p>
              <p>Album: {albumName}</p>
        </div>


      );
  }//end of render
}//component end

export default WebPlayer;
