import React,{ Fragment } from 'react'
import { Link } from 'react-router-dom'
// REDUX
import { useSelector } from 'react-redux'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function UserList(props) {

  const connectedUser = useSelector(state => state.user.loggedUser)
  const { open } = props

  const classes = useStyles() 

  return (
      <Fragment> 
  
        {open ? <ExpandLess /> : <ExpandMore />}
  
      <Collapse in={open} timeout="auto" unmountOnExit style={{position: 'absolute', transform: 'translateY(20px)', }}  >
        <Paper  > 
        <List style={{maxHeight: 500, width: 210, overflowY: 'auto' }}
        component="nav"
      
        aria-labelledby="nested-list-subheader"
        subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         Usuarios...
        </ListSubheader>
      }
      className={classes.root}>
        {props.searchResults.filter(user => user._id !== connectedUser._id ).map((user, key) =>
        <Fragment key={key} >
          <Link style={{textDecoration: 'none'}} to={`/users/${user._id}`} > <ListItem button className={classes.nested} >
            <ListItemAvatar>
              <Avatar
                src={user.profileImg}
              />
            </ListItemAvatar>
            <ListItemText  secondary={user.username} />
          </ListItem>
          </Link>

        </Fragment>  
        )}
         </List>
         </Paper>
      </Collapse>
      </Fragment>
  );
}