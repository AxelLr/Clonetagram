import React,{ useState } from 'react'
// ROUTER 
import { Link } from 'react-router-dom'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
// ICONS
import PublicIcon from '@material-ui/icons/Public'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
// ACTIONS
import { logOutUser } from '../../../redux/actions/AuthenticationActions'
// TYPES
import { CLOSE_MENU } from '../../../redux/reducers/types'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }))

export default function DrawerNavigator() {

    const [ open, setOpen ] = useState(false)
    const dispatch = useDispatch()
    const openMenu = useSelector(state => state.UI.openMenu)
    const loggedUser = useSelector(state => state.user.loggedUser)
    
    const classes = useStyles()

    const handleLogOut = () => {
        dispatch({type: CLOSE_MENU})
        dispatch(logOutUser())
    }
    
    return (
      <Drawer style={{width: '70%'}} color='secondary' open={openMenu} onClose={() => dispatch( { type: CLOSE_MENU } )}>
        
          <Link style={{margin: 0, padding: 0, display: 'flex'}} onClick={() => dispatch({type: CLOSE_MENU })} to={`/users/${loggedUser._id}`}>
            <img src={loggedUser.profileImg} style={{width: 100, height: 100, margin: '5px auto', borderRadius: '50%'}} />
          </Link>  
         
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          > 
            <Link style={{textDecoration: 'none'}} onClick={() => dispatch({type: CLOSE_MENU})} to='/Home'>
                <ListItem button className={classes.nested}>
                    <ListItemIcon> <HomeIcon /> </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
            </Link>

                <Divider />

            <Link style={{textDecoration: 'none'}} onClick={() => dispatch({type: CLOSE_MENU})} to='/Explore'>    
                <ListItem button className={classes.nested}>
                    <ListItemIcon> <PublicIcon /> </ListItemIcon>
                    <ListItemText primary='Explorar' />
                </ListItem>
            </Link>    

                <Divider />

                <ListItem button onClick={() => setOpen(true)} className={classes.nested}>
                    <ListItemIcon> <ExitToAppIcon/> </ListItemIcon>
                    <ListItemText primary='Cerrar Sesión' />
                </ListItem>
          </List>

          <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" >
                
                <DialogTitle> Estas Seguro de que quieres desconectarte ? </DialogTitle>

                <DialogActions>
                    <Button onClick={handleLogOut} variant='contained' color="primary">
                      Si 
                    </Button>
                    <Button onClick={() => setOpen(false)} variant='contained' color="secondary">
                      Cancelar
                    </Button> 
                </DialogActions>
         </Dialog>
      </Drawer>
    )
}
