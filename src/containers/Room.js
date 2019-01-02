import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAuthorization } from '../actions/AuthActions'
import { currentUser } from '../actions/AuthActions'
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

  componentWillMount() {
  // Save url queryString
  const queryString = this.props.location.search


  if (queryString.includes('jwt')) {
    const jwtcode = queryString.split('=')[1]
    localStorage.setItem('jwt', jwtcode)
    this.props.currentUser()
} else if (localStorage.getItem('jwt')) {
      this.props.currentUser()

}

}



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
            <Grid.Row>
      <BrowseBar onBrowseChange={this.props.onBrowseChange} appState={this.props.state}/>
            </Grid.Row>




          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
    currentUser
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    playlist: state.playlist

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Room)
