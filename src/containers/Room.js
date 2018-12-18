import React, { Component } from 'react';
import BrowseBar from '../components/BrowseBar'


class Room extends Component {



  render() {
    return (
      <div >
        <BrowseBar onBrowseChange={this.props.onBrowseChange} appState={this.props.state}/>
    	  </div>
    );
  }
}

export default Room;
