import React, { Component } from 'react';
import _ from 'lodash'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'


class BrowseBar extends Component {
componentWillMount() {
  this.resetComponent()
}
state = { results: this.props.appState.browseResults}

resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

handleResultSelect = (e, { result }) => this.setState({ value: result.title })

getDerivedStateFromProps(this.props.appState.browseResults, this.state.results){
  return this.props.appState.browseResults
}


  render() {
    const { isLoading, value, results } = this.state

    return (
      <div>
      <div className="ui segment">
              <form  className="ui form">
                <div  className="field">
                  <label>BrowseArtist</label>
                  <input type="text" value={this.state.value}  onChange={(e)=> {this.setState({value: e.target.value}, () => {
                      this.props.onBrowseChange(this.state.value)
                      this.setState({results: this.props.appState.browseResults})
                    }
                  )}} />
                </div>
              </form>
            </div>
            <Grid>
              <Grid.Column width={6}>
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  results={results}
                  value={value}
                  {...this.props}
                />
              </Grid.Column>
              <Grid.Column width={10}>
                <Segment>

                </Segment>
              </Grid.Column>
            </Grid>
          </div>

    );
  }
}

export default BrowseBar;
