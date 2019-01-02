import React from 'react'
import { connect } from 'react-redux'
import { fetchAuthorization } from '../actions/AuthActions'
import { currentUser } from '../actions/AuthActions'
import { Table } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import TableItem from './TableItem.js'

class TableExampleVeryBasic extends React.Component {

  renderTrack = (tracks) => {

    return tracks.map(track => {
      return <TableItem key={track.id} track={track} />
    })
  }



  render() {
    console.log("Table", this.props)
    return (
      <Table basic='very' inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Album</Table.HeaderCell>
            <Table.HeaderCell><Icon  name='clock outline' inverted/></Table.HeaderCell>
            <Table.HeaderCell>Added By</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
{this.props.playlist[0] ? this.renderTrack(this.props.playlist[0]["tracks"]) : null}
        </Table.Body>
      </Table>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    playlist: state.playlist
  }
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(TableExampleVeryBasic)
