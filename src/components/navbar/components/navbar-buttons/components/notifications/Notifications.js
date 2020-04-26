import React,{ useState, useEffect } from 'react'
// REDUX 
import { useDispatch, useSelector } from 'react-redux'
// MUI
import ToolTip from '@material-ui/core/Tooltip'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Badge from '@material-ui/core/Badge'
// ICONS
import IconButton from '@material-ui/core/IconButton'
// ACTIONS
import { getUserNotifications, markNotificationsAsReaded } from '../../../../../../redux/actions/NotificationActions'
// COMPONENTS
import Notification from './components/Notification'
import FollowUpRequest from './components/FollowUpRequest'
import RequestsHandler from './components/RequestsHandler'

function Notifications () {

const dispatch = useDispatch() 

const notifications = useSelector(state => state.notifications.notifications)
const requests = useSelector(state => state.user.loggedUser.followUpRequests)

const [ anchorEl, setAnchorEl ] = useState(null)
const [ showRequests, setShowRequests ] = useState(false) 

useEffect(() => { dispatch(getUserNotifications()) }, [dispatch])

const handleOpen = event => setAnchorEl(event.target)

const handleClose = () => {
  setShowRequests(false)
  setAnchorEl(null)
}

const onMenuOpened = () => {
  let unreadedNotifications = notifications.filter((notif) => !notif.readed).map((notif) => notif._id)
  unreadedNotifications.length > 0 && dispatch(markNotificationsAsReaded(unreadedNotifications)) 
}

    return (
          <div>
              <ToolTip placement="top" title="Notificaciones">
                <IconButton
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={handleOpen}
                >
                  <Badge 
                      badgeContent={notifications.filter(not => not.readed === false).length}
                      color='secondary'
                      max={999}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                  >
                    <NotificationsActiveIcon style={{color: '#888888'}}/>
                  </Badge>
                </IconButton>
              </ToolTip>
              <Menu
                style={{padding: 0, maxHeight: 300 }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onEntered={onMenuOpened}
                disableScrollLock={true}
                MenuListProps={{ disablePadding: false}}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{horizontal: "right", vertical: 'top' }}
                keepMounted
              >
              { showRequests && requests.map((req) => <FollowUpRequest key={req._id} request={req} />) }
              { requests && requests.length > 0 && !showRequests && <RequestsHandler setShowRequests={setShowRequests} requests={requests}/> }           
              
              { notifications.length > 0 ? <div> { notifications.filter(not => not.type !== 'followRequest').map((not) => <Notification key={not._id} notification={not} />) } </div>

              :    

              <MenuItem onClick={handleClose}>
                No tienes notificaciones
              </MenuItem>

              }
              </Menu>
          </div>
    )
}

export default Notifications







  
    