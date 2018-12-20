import React, { Component } from 'react';
import _ from 'lodash'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'


class BrowseBar extends Component {

  state={
    results: this.props.results
  }
componentWillMount() {
  this.resetComponent()
}


resetComponent = () => this.setState({ isLoading: false, value: '' })

handleResultSelect = (e, { result }) => {
  fetch("http://localhost:3000/api/v1/rooms/1", {
    method: 'PATCH', // or 'PUT'
    body: JSON.stringify(result), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => {
    // debugger
    // console.log('Success:', JSON.stringify(response))
    // let resultsJSON = response["tracks"].items.map((track)=>{
    //   return {"title": track.name,
    //   "image": track.album.images[0].url,
    // "artist": track.artists[0].name,
    // "uri": track.uri}
    // })
    // console.log(resultsJSON)
    //
    // this.setState({browseResults: resultsJSON})
    // this.props.setSearchResults(resultsJSON)

})
  .catch(error => console.error('Error:', error));


}



  render() {
    const { isLoading, value, results } = this.state
    // console.log(this.props)

    return (
      <div>

                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={(e)=> this.setState({value: e.target.value}, () => {
                      this.props.onBrowseChange(this.state.value)
                    })
                  }
                  results={this.props.results}
                  value={value}
                  {...this.props}
                />

          </div>

    );
  }
}

function mapStateToProps(state){
  return {
    results: state.results
  }
}

export default connect(mapStateToProps)(BrowseBar);
