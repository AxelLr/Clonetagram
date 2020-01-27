import React,{ Fragment } from 'react'
import moment from 'moment'
import AddComment from './addcomment/AddComment'
import DeleteComment from './deletecomment/DeleteComment'
import AddReply from './addReply/AddRepply'
// REDUX
import { useSelector } from 'react-redux'
// MUI 
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

const useStyles = makeStyles(theme => ({
  root: {
    height: '90%',
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
    width: '100%'
  },
  inline: {
    display: 'inline',
  },
}));

export default function CommentsList(props) {

  const connectedUser = useSelector(state => state.user.loggedUser)
  const classes = useStyles()

  return (
  <div style={{width: '50%'}}> 
    < AddComment selectedPost={props.selectedPost} />  
    <List className={classes.root}>
    <div style={{width: '100%'}}> 
    { props.comments.map((comment, key) => 
        <Fragment key={key}> 
            <ListItem id='comment-box' alignItems="flex-start" >
                <ListItemAvatar>
                <Avatar alt="comment profile" src={comment.user_id && comment.user_id.profileImg} />
                </ListItemAvatar>
              
              <div style={{width: '100%'}}>
                <div > 
                  <ListItemText
                      primary={comment.user_id && comment.user_id.username}
                      secondary={moment(comment.date).format('LLL')}
                  />
                <span style={{position: 'absolute', right: 0, top: 0}}>
                  { connectedUser._id === comment.user_id._id &&
                   < DeleteComment comment_id={comment._id} selectedPost={props.selectedPost}  />
                  }
                </span>  
                </div>
                <ListItemText
                    primary={comment.content}
                />
                <ExpansionPanel className={classes.ExpansionPanel} style={{margin: 0, outline: 'none'}}>
                  <ExpansionPanelSummary className={classes.ExpansionPanelSummary}>
                    <ListItemText secondary={`responder (${comment.replys.length})`}/>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{width: '100%'}}>
                   <div style={{ width: '100%', display: 'flex', flexDirection: 'column', maxHeight: 400, overflow: 'auto'}}>
                    < AddReply comment={comment} selectedPost={props.selectedPost} />
                    {comment.replys && comment.replys.map((reply, key) =>
                    <div key={key}>
                    
                        <div>
                          <div > 
                            <ListItemText
                                primary={reply.username}
                                secondary={moment(reply.date).format('LLL')}
                            />
                          </div>
                          <ListItemText
                              primary={reply.content}
                          />
                        </div>
                    
                      <Divider variant="inset" component="span" />
                       </div>
                    )}
                  </div> 
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>     
            </ListItem>
                  
            <Divider variant="inset" component="li" />
            
        </Fragment>  
    )}
    </div>
    
    </List>
    
  </div>   
  )}