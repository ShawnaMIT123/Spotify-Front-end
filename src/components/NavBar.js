import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import AUXHeader from './AUXHeader.js'

export default class MenuExampleInvertedVertical extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted vertical fluid compact borderless>
        <Menu.Item name='header'>
        <AUXHeader />
        </Menu.Item>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
        <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
      </Menu>
    )
  }
}
