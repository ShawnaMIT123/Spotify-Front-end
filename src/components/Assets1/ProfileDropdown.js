import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

const style = {
  avatar: {
    display: 'inline',
    margin: '0 auto',
    height: '100%',
    width: 'auto'
  },
  item: {paddingTop: '6px', paddingBottom: '6px', width:'200px'},
  imageCropper:{
    width: '50px',
    height: '50px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    margin: '0 auto'
  }
}


// Define components for custom dropdown: trigger (profile_image and name)
const trigger = (user) => {
  const img_url = user.img_url || "http://i.imgur.com/6Onxeu9.png"
  return (
    <div style={style.imageCropper}><img src={img_url} style={style.avatar}/></div>
  )
}

// const options = (user, handleClick) => [
//   {key: 'account', text: 'Account', as: 'a', href:`${user.url}`, target: '_blank'},
//   {key: 'logout', text: 'Logout', as: 'a', href:'/', onClick: handleClick}
// ]

export const ProfileDropdown = ({user, handleClick}) => (
  <Menu.Item position='right' style={style.item}>
    <Dropdown fluid trigger={trigger(user)} icon={null}>
      <Dropdown.Menu>
        <Dropdown.Header content={user.display_name}/>
        <Dropdown.Item text='My Account' as='a' href={user.url} target='_blank' ></Dropdown.Item>
        <Dropdown.Item text='Logout' as='a' href='/' onClick={handleClick}></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Item>
)
