import React,{ useState } from 'react'
// ROUTER
import { withRouter } from 'react-router-dom'
// MUI
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
// ICONS
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
// COMPONENTS
import EditDescription from './components/EditDescription'
import EditImage from './components/EditImage'
import HandlePrivacy from './components/HandlePrivacy'
// REDUX
import { useDispatch } from 'react-redux'
// ACTIONS
import { logOutUser } from '../../../../redux/actions/AuthenticationActions'

 function EdditAccountDetails({ description, connectedUser, history }) {

  const dispatch = useDispatch()

  const [open, setOpen] = useState(null)
  const [openDescription, setOpenDescription] = useState(false)
  const [openImage, setOpenImage] = useState(false)

  const handleClick = (event) => setOpen(event.currentTarget)

  const handleDescriptionEdit = () => {
    setOpenDescription(true)
    setOpen(false)
  }

  const handleImageEdit = () => { 
    setOpenImage(true)
    setOpen(false)
  }

  const handleLogOut = () => dispatch(logOutUser(history))
  
  return (
    <div>
        <IconButton onClick={handleClick} style={{height: 50, color: '#e5e5e5'}}>
            < EditIcon />                   
        </IconButton>
      <Menu
        disableScrollLock={true}
        MenuListProps={{ disablePadding: false}}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ horizontal: "right" }}
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={() => setOpen(false)}
      >
        <MenuItem onClick={handleDescriptionEdit}>Editar descripción</MenuItem>
        <MenuItem onClick={handleImageEdit} > Editar imágen de perfil  </MenuItem>
        <MenuItem > <HandlePrivacy connectedUser={connectedUser}/> </MenuItem>
        <MenuItem onClick={handleLogOut} > Cerrar Sesión</MenuItem>
      </Menu>
      <EditImage open={openImage} setOpen={setOpenImage} /> 
      <EditDescription open={openDescription} setOpen={setOpenDescription} description={description} />
      
    </div>
  )
}

export default withRouter(EdditAccountDetails)