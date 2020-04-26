import React from 'react'
import moment from 'moment'
// COMPONENTS
import Replies from './components/Replies/Replies'
import DeleteComment from './components/DeleteComment'
// MUI
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'

import { makeStyles } from '@material-ui/core/styles'
// REDUX
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      overflow: 'auto',
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    ExpansionPanelSummary: {
      border: 0,
      width: '100%',
      boxShadow: 'none'
    },
    ExpansionPanel: {
      border: 0,
      boxShadow: 'none',
      width: '100%',
      margin: 0,
      outline: 'none',
    },
    inline: {
      display: 'inline',
    },
  }))

export default function Comment({ comment }) {

    const connectedUser = useSelector(state => state.user.loggedUser)
    const selectedPost = useSelector(state => state.data.selectedPost)
    const classes = useStyles()  

    return (
      <div> 
          <ListItem id='comment-box' alignItems='flex-start' >

              <ListItemAvatar>
                  <Avatar alt='comment profile' src={comment.user_id.profileImg} />
              </ListItemAvatar>
            
            <div style={{ width: '100%'}}>
              <ListItemText
                primary={comment.user_id.username}
                secondary={moment(comment.date).format('LLL')}
              />

              <span style={{position: 'absolute', right: 0, top: 0}}>
                { connectedUser._id === comment.user_id._id && <DeleteComment comment_id={comment._id} selectedPost={selectedPost}  /> }
              </span>  
              
              <ListItemText
                primary={comment.content}
              />
              
              <ExpansionPanel className={classes.ExpansionPanel}>

                  <ExpansionPanelSummary className={classes.ExpansionPanelSummary}>
                      <ListItemText secondary={`responder (${comment.replies.length})`}/>
                  </ExpansionPanelSummary>
                  
                  <Replies replies={comment.replies} selectedPost={selectedPost} comment={comment} />
              
              </ExpansionPanel>
            </div>     
          </ListItem>     
          <Divider variant='inset' component='li' />
      </div>  
    )
}
