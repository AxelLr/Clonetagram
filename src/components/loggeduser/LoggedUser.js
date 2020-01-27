import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { getConnectedUser, logOutUser } from '../../redux/actions/UserActions'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ToolTip from '@material-ui/core/Tooltip'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function LoggedUser(props) {

  const connectedUser = useSelector(state => state.user.loggedUser)
 
  const dispatch = useDispatch()
 
  useEffect(() => {
  dispatch(getConnectedUser())
  }, [dispatch])

  const classes = useStyles()

  const handleLogOut = () => {
    dispatch(logOutUser(props.history))
  }

  return (

    <nav className={classes.root}>
      <AppBar position='fixed' style={{backgroundColor: '#121212'}} >
        <Toolbar>

            <img alt='profile' src={connectedUser.profileImg} height={50} width={50} style={{borderRadius: '50%', margin: 10}}/>
               
            <Typography variant='h6' className={classes.title} style={{margin: 15}}>
              {connectedUser.username}
            </Typography>
      
            <div>
              <ToolTip title='Perfil'>
              <Link style={{textDecoration: 'none', color: 'white'}} to={`/users/${connectedUser._id}`}> 
                  <IconButton
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        color='inherit'
                      >
                      <AccountCircle />
                  </IconButton>
              </Link>
              </ToolTip>

              <ToolTip title='Desconectarse'> 
                  <IconButton onClick={handleLogOut} color='inherit'>  
                      < ExitToAppIcon />  
                  </IconButton> 
              </ToolTip>
            </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
