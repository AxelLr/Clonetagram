import React from 'react'
// MUI 
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
// ROUTER
import { Link } from 'react-router-dom'
// MOMENT
import moment from 'moment'

export default function Notification({ notification }) {
    
    const { readed, sender, type, createdAt, senderName, postRef, senderAvatar } = notification

    let icon = type === 'like' ? ( <FavoriteIcon style={{color: '#DA201E'}}/> ) : (type === 'comment' || 'reply') && ( <ChatIcon style={{color: '#1565C0'}} /> )
    
    let action = type === 'like' ? 'le dio me gusta a tu publicación' : type === 'comment' ? 'ha comentado tu publicación' : type === 'reply' ? 'respondió un comentario tuyo' : type === 'follow' && 'ha comenzado a seguirte' 

    let route = type === 'follow' ? `/users/${sender}` : `/posts/${postRef}`

    return (
        <div>
          <ListItem button style={{minWidth: 430, backgroundColor: !readed && '#A8A8A8'}} >
        
            <Link to={`/users/${sender}`}> 
              <ListItemAvatar >
                <Avatar alt="Remy Sharp" src={senderAvatar} />
              </ListItemAvatar>
            </Link>

            <Link to={route} style={{textDecoration: 'none'}}>
              <ListItemText
                primary={senderName + ' ' + action}
                secondary={moment(createdAt).startOf('hour').fromNow()}
              />
              <ListItemSecondaryAction>
                {icon}
              </ListItemSecondaryAction>
            </Link>

          </ListItem>

          <Divider variant="inset" component="li" />
        </div>
    )
}
