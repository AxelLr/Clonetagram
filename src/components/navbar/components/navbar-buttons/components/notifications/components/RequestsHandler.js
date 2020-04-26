import React from 'react'
// MUI
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import PersonIcon from '@material-ui/icons/Person'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Badge from '@material-ui/core/Badge'

export default function RequestsHandler({ setShowRequests, requests = [] }) {
    return (
        <ListItem onClick={() => setShowRequests(true)} style={{minWidth: 430, cursor: 'pointer'}} >     
        <ListItemAvatar style={{display: 'flex', alignItems: 'center', marginLeft: 10}} >
            <Badge 
                badgeContent={requests.length}
                color='secondary'
                max={999}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
            >
              <PersonIcon/>
            </Badge>
        </ListItemAvatar>
    
        <ListItemText
            primary='Solicitudes de seguidores'
            secondary='Aprueba o ignora las Solicitudes'
        />

        <ListItemSecondaryAction onClick={()=> setShowRequests(true)} style={{cursor: 'pointer'}}>
              <ChevronRightIcon />
        </ListItemSecondaryAction>
    </ListItem>
    )
}
