import React, { Component } from 'react';
import BrowseBar from '../components/BrowseBar'
// import HeaderExampleInverted from '../components/Header'
import TrackList from '../components/TrackList'
import WebPlayer2 from '../components/WebPlayer2'
import { Search, Grid, Header, Segment, Image } from 'semantic-ui-react'
import Sidebar from '../components/NavBar'
import AUXHeader from '../components/AUXHeader'
import TopBar from '../components/TopBar'
import TableTest from '../components/TableTest'




class Room extends Component {



  render() {
    return (
      <div >
        <Grid columns='equal'>
          <Grid.Column width={3}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={13}>
            <Grid.Row>
                <WebPlayer2 />
            </Grid.Row>
            <Grid.Row>
                <TableTest />
            </Grid.Row>



          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Room;
