import React from 'react'
import { Link } from 'react-router-dom'
// MUI
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }))

export default function SubsFollowersList({ open, userList = [], setOpen, showingFollowers }) {

   const classes = useStyles() 

    return (
        <Dialog children='div' open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" >
            <div>
                <List 
                    style={{width: '100%'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        { showingFollowers ? 'Seguidores' : 'Seguidos' } < hr/>
                        {userList.length === 0 && showingFollowers ? 'Esta cuenta no tiene seguidores' : userList.length === 0 && !showingFollowers && 'Esta cuenta no sigue a nadie'}
                    </ListSubheader>
                    }
                    className={classes.root}>

                 { userList.map((user, key) =>  

                    <div key={key}>
                        <Link onClick={() => setOpen(false)} style={{textDecoration: 'none'}} to={`/users/${user.user_id._id}`} >
                            <ListItem button className={classes.nested} >
                                <ListItemAvatar>
                                    <Avatar
                                        src={user.user_id.profileImg}
                                    />
                                </ListItemAvatar>
                                <ListItemText secondary={user.user_id.username} />
                            </ListItem>
                        </Link>
                    </div>                   
                 )} 
                </List>
            </div>
        </Dialog>
    )
}
