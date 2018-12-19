import React from 'react'
import { List } from 'semantic-ui-react'

const TrackItem = (props) => (
    <List.Item>
      <List.Icon name='play circle' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>{props.track.title}</List.Header>
        <List.Description as='a'>{props.track.artist}</List.Description>
      </List.Content>
    </List.Item>
)

export default TrackItem
