import React from 'react'
import moment from 'moment'
// MUI
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'
// COMMENT 
import DeleteReply from './DeleteReply'

export default function Reply({ reply, comment }) {

    const { profileImg, createdAt, username } = reply.user_id
    return (
        <ListItem style={{display: 'flex'}}> 
            <ListItemAvatar>
                  <Avatar alt='comment profile' src={profileImg} />
              </ListItemAvatar>
           
            <div style={{ width: '100%'}}>
                <ListItemText
                    primary={username}
                    secondary={moment(createdAt).format('LLL')}
                />
             
                <ListItemText primary={reply.content} />

                <ListItemSecondaryAction>
                    <DeleteReply reply={reply} comment={comment} /> 
                </ListItemSecondaryAction>
            </div>
            <Divider variant="inset" component="span" />
        </ListItem>
    )
}
