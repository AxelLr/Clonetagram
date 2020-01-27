import React,{ Fragment } from 'react'
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
  }));

export default function SubsFollowersList(props) {

   const { open, userList, setOpen, userProps } = props
   const classes = useStyles() 

   console.log(userList)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog children='div' open={open} onClose={handleClose} fullWidth maxWidth="sm" >
            <div>
                <List 
                    style={{width: '100%'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    
                    
                    { userProps ? 'Seguidores' : 'Seguidos' } < hr/>
                    {userList && userList.length === 0 && userProps ? 'Esta cuenta no tiene seguidores' : userList && userList.length === 0 && !userProps && 'Esta cuenta no sigue a nadie'}
                    </ListSubheader>
                    }
                    className={classes.root}>

                    { userList && userList.map((user, key) =>

                    <Fragment key={key}>
                         
                        <Link onClick={() => setOpen(false)} style={{textDecoration: 'none'}} to={`/users/${user.user_id}`} >
                        <ListItem button className={classes.nested} >
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
            </div>
        </Dialog>
    )
}
