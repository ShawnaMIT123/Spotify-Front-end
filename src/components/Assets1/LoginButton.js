import React from 'react'
import { Menu, Image, Header } from 'semantic-ui-react'
import { ApiUrl } from './ApiUrl'
import SpotifyLogo from '../../assets/spotify/Spotify_Logo.png'

const style = {
  logo: {width: '120px', height: 'auto'},
  logoCaption: {fontWeight: 'normal'}
}

export const LoginButton = () => (
  <Menu.Item href={`${ApiUrl}login`} position="right">
    <span><Header size="medium" style={style.logoCaption}>Login with</Header></span>
    <Image src={SpotifyLogo} style={style.logo} floated="right" avatar/>
  </Menu.Item>
)
