import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { fetchAuthorization } from '../actions/AuthActions'
import { getRoomTracks} from '../actions/AuthActions'
import { getCurrentUsers} from '../actions/AuthActions'

var mainContainer = document.getElementById('js-main-container'),
    background = document.getElementById('js-background');

class WebPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token:"",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      paused: false,
      position: 0,
      duration: 0,
      uris: [],
      startTime: null,
      counter: 0,
      artistsCache: {},
      artistFetching: false,
      albumImage: null
    };

    this.playerCheckInterval = null;
  }

  componentDidMount(){

    // fetch("http://localhost:3000/api/v1/users/1", {
    //   method: 'GET', // or 'PUT'
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    // .then(response => {
    //   this.setState({token: response["access_token"]
    //      }, () => {
    //
    //     this.handleLogin()
    //   })
    // })
        setTimeout(() => this.handleLogin(), 4000);
  }

  handleLogin() {

    if (this.state.token == "") {
      this.setState({ loggedIn: true });
      // check every second for the player.
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
      // this.checkForPlayer()
      //*****write function to update state and user in the back end logged in*****
    }
  }

  checkForPlayer() {
     // let token  = this.props.user.user["access_token"];

    if (window.Spotify && this.props.user.user ) {

           clearInterval(this.playerCheckInterval);
           this.setState({token: this.props.user.user["access_token"]}, ()=> this.createPlayer())

      }

      // finally, connect!
  }


createPlayer() {
  const { token } = this.state;

  this.player = new window.Spotify.Player({
    name: "Shawna's New Spotify Player",
    getOAuthToken: cb => { cb(this.props.user.user["access_token"]); },
  });
  this.player.connect();
  // //console.log("player connected")
   this.createEventHandlers();

   setInterval(()=>{this.props.getRoomTracks()}, 1000);
   setInterval(()=>{this.props.getCurrentUsers()}, 1000);
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
    this.player.on('player_state_changed', state => this.settingStateofNewSong(state));
//   this.player.on('player_state_changed', response=> response => {
//   var mainArtist = response.track_window.current_track.artists[0];
//   if (!(mainArtist.id in this.state.artistsCache) && !this.state.artistFetching) {
//     artistFetching = true;
//     this.player.fetchGeneric(mainArtist.href)
//       .then(function(artist) {
//         this.state.artistFetching = false;
//         return artist.json();
//       }).then(function(artist) {
//         if (artist.images.length) {
//           artistsCache[artist.id] = artist.images[0].url;
//         }
//       }).catch(function(e) {
//         artistFetching = false;
//       });
//   }
//   mainContainer.innerHTML = template(response);
// })



    // Ready
    this.player.on('ready', async data => {
      let { device_id } = data;
      //console.log("Let the music play on!");
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
      // setTimeout(() => this.playQueueSong(), 2000);
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
  }).then(console.log("transferedPlaybackHere!"))
  this.getCurrentStateEverySecond();
}


settingStateofNewSong(state) {
  // if we're no longer listening to music, we'll get a null state.
//console.log("prior state" , state)
//console.log("prior this.state" , this.state)

////first song to change to after playback transfer
if(this.state.counter == 0 ){


} else if ((state !== null && state.position == 0 && state.paused == false && state.duration == this.state.duration) || (state !== null && state.position == 0 && state.playing == true) || (state !== null && state.position == 0 && this.state.duration == 0) || (state !== null && state.position == 0 && state.paused == false  && state.duration > 0 )){
  //console.log("duration", this.state.duration)

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
  const paused = state.paused;

  //console.log("running settingStateofNewSongFirstSong", state)
  this.setState({
    position,
    duration,
    trackName,
    albumName,
    artistName,
    paused

  }, ()=>{
    // //console.log("settingStateofNewSong", this.state)

        setTimeout(() => this.playQueueSong(), 3000 + duration)
        // setTimeout(() => this.deleteFinishedSong(), duration)
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
    const paused = state.paused;
    this.setState({
      position,
      duration,
      trackName,
      albumName,
      artistName,
      paused

    });
    // //console.log("first playback", this.state)
  }
  //identify if this is the first state change
  this.setState(currentState => {
    return {counter: currentState.counter + 1 };
  });

}

playQueueSong = () => {
///If playlist is empty
  if(this.props.appstate.playlistSongs.length == 0){
    console.log("Song List is Empty")
  }else {


  // //console.log("playlist pressed")
  // //console.log("appState", this.props.appstate)
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
    // //console.log('Success:', JSON.stringify(response))
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
}

// deleteFinishedSong = () => {
//   //console.log("playlist pressed")
//   //console.log("appState", this.props.appstate)
//   const { deviceId, token, uris} = this.state;
//
//
//
//   fetch(`http://localhost:3000/api/v1/tracks/${this.props.appstate.playlistSongs[0].id}`, {
//     method: 'DELETE'// or 'PUT'
//   })
//   .then(response => //console.log('Success:', JSON.stringify(response)))
//   .catch(error => console.error('Error:', error));
//
// }

playRoomPlaylist() {
  //console.log("playlist pressed")
  //console.log("appState", this.props.appstate)
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

    // //console.log(tracks)
  })

}

getCurrentPlayerState(){
  ////console.log("setting CurrentPlayStateIncrement")
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
          const albumImage = currentTrack.album.images[0].url
          const paused = state.paused;
          this.setState({
            position,
            duration,
            trackName,
            albumName,
            artistName,
            paused,
            albumImage

          });
           // //console.log(this.state)
        }
    })
}

getCurrentStateEverySecond() {

    setInterval(() => this.getCurrentPlayerState(), 1000);

}


// var artistsCache = {},
//     artistFetching = false;
// spotifyPlayer.on('update', response => {
//   var mainArtist = response.item.artists[0];
//   if (!(mainArtist.id in artistsCache) && !artistFetching) {
//     artistFetching = true;
//     spotifyPlayer.fetchGeneric(mainArtist.href)
//       .then(function(artist) {
//         artistFetching = false;
//         return artist.json();
//       }).then(function(artist) {
//         if (artist.images.length) {
//           artistsCache[artist.id] = artist.images[0].url;
//         }
//       }).catch(function(e) {
//         artistFetching = false;
//       });
//   }
//   mainContainer.innerHTML = template(response);
// });






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
      paused,
      albumImage
    } = this.state;






//console.log(this.state)
  return (
    <div>
      <div className="playerbackgroud">
    <div className="main-wrapper">
      <div className="now-playing__img">
        <img src={albumImage}></img>
      </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{trackName}</div>
          <div className="now-playing__artist">{artistName}</div>
            <div class="now-playing__status">{paused ? 'Paused' : 'Playing'}</div>
          <div className="progress">
            <div className="progress__bar" style={{width: `${position * 100 / duration}%` }}></div>
          </div>
        </div>

      </div>

        </div>
      </div>




      );
  }//end of render
}//component end

// const mapDispatchToProps = {
//     currentUser
// }
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ getRoomTracks, getCurrentUsers }, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(WebPlayer)
