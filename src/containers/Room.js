import React, { Component } from 'react';
import BrowseBar from '../components/BrowseBar'
import HeaderExampleInverted from '../components/Header'
import TrackList from '../components/TrackList'
import WebPlayer from '../components/WebPlayer'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'



class Room extends Component {



  render() {
    return (
      <div >
        <HeaderExampleInverted />
        <WebPlayer />


<br/>
<br/>
<br/>

        <Grid>
          <Grid.Column width={11}>
            <TrackList appState={this.props.state} />
          </Grid.Column>
          <Grid.Column width={3}>
            <BrowseBar onBrowseChange={this.props.onBrowseChange} appState={this.props.state}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Room;
