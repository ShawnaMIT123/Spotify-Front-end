import React from 'react'
import { Table } from 'semantic-ui-react'

const TableItem = (props) => {

const millisToMinutesAndSeconds = (millis) =>{
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

  return(
  <Table.Row>
    <Table.Cell size='tiny'>{props.track.title}</Table.Cell>
    <Table.Cell size='tiny'>{props.track.artist}</Table.Cell>
    <Table.Cell size='tiny'>{props.track.album}</Table.Cell>
    <Table.Cell size='tiny'>{millisToMinutesAndSeconds(props.track.duration_ms)}</Table.Cell>
    <Table.Cell size='tiny'>{props.track.user_name}</Table.Cell>
  </Table.Row>)
}

export default TableItem
