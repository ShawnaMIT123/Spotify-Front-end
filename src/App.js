import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import SearchBar from './components/SearchBar'
import BrowseBar from './components/BrowseBar'
import Room from './containers/Room'

const button = () => {return <Button as="a" href="http://localhost:3000/api/v1/login"> Login </Button>}


class App extends Component {

 state = {browseResults: []}

  onSearchSubmit = (term) => {
    fetch("http://localhost:3000/api/v1/users/addPlaylist", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(term), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
      // const response = await axios.get('http://localhost:3000/api/v1/users/addSong',{
      //   params: { query: term},
      //   headers: {
      //     Authorization: 'Client-ID 81fc93b8332e81b7fcc8a512b5d5fd2e7b168b6c123396f4367ab2f03bbc03f6'
      //   }
      //
      // })
      // this.setState({images: response.data.results })
    }

    onBrowseChange = (term) => {
      fetch("http://localhost:3000/api/v1/users/browserBar", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(term), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response))
        let resultsJSON = response["tracks"].items.map((track)=>{
          return {"title": track.name,
          "image": track.album.images[0].url,
        "artist": track.artists[0].name,
        "uri": track.uri}
        })
        console.log(resultsJSON)

        this.setState({browseResults: resultsJSON})

    })
      .catch(error => console.error('Error:', error));
    }




  render() {
    return (
      <div className="App">
        <Route path="/login" component={button} />

        <Route path="/success" render={(props) => <Room {...props} state={this.state} onBrowseChange={this.onBrowseChange} />}
          />

      </div>
    );
  }
}

export default App;
