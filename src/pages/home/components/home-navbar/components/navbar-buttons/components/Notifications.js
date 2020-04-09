import React,{ useState, useEffect,  } from 'react'
import { Link } from 'react-router-dom';
// REDUX 
import { useDispatch, useSelector } from 'react-redux'
// MUI
import ToolTip from '@material-ui/core/Tooltip'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
// ICONS
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
// ACTIONS
 import { getUserNotifications, markNotificationsAsReaded } from '../../../../../../../redux/actions/NotificationActions'

function Notifications () {

const dispatch = useDispatch() 

const notifications = useSelector(state => state.notifications.notifications)

const [anchorEl, setAnchorEl] = useState(null)

useEffect(() => {
dispatch(getUserNotifications())
}, [])

const handleOpen = event => setAnchorEl(event.target)

const handleClose = () => setAnchorEl(null)

const onMenuOpened = () => {
  let unreadedNotifications = notifications.filter((notif) => !notif.readed).map((notif) => notif._id)
  dispatch(markNotificationsAsReaded(unreadedNotifications))
}

let notificationIcon

if(notifications && notifications.length > 0) {
    notifications.filter(not => not.readed === false).length > 0 ?
    (notificationIcon = (
        <Badge badgeContent={ notifications.filter(not => not.read === false).length}
            color='secondary' > <NotificationsActiveIcon color='secondary'/> </Badge>
    )) : notificationIcon = <NotificationsActiveIcon color='secondary' />  
} else {
    notificationIcon = <NotificationsActiveIcon color='secondary' />  
}

let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === 'like' ? 'le dio me gusta a' : 'comentó';
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} />
            ) : (
              <ChatIcon color={iconColor} />
            )
            return (
                <MenuItem key={not.createdAt} onClick={handleClose}>
                  {icon}
                  <Typography
                    component={Link}
                    color="default"
                    variant="body1"
                    to={`/users/${not.recipient}/scream/${not.screamId}`}
                  >
                    {not.sender} {verb} tu post 
                  </Typography>
                </MenuItem>
              )
            })
          ) : (
            <MenuItem onClick={handleClose}>
              No tienes notificaciones
            </MenuItem>
          )
            
    return (
        <>
          <ToolTip placement="top" title="Notificaciones">
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={handleOpen}
            >
              {notificationIcon}
            </IconButton>
          </ToolTip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onEntered={onMenuOpened}
          >
            {notificationsMarkup}
          </Menu>
        </>
    )
}

export default Notifications