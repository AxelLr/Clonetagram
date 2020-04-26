import React,{ useState } from 'react'
import moment from 'moment'
// REDUX
import { useDispatch } from 'react-redux'
import { ignoreRequest, acceptRequest } from '../../../.././../../../redux/actions/UserActions'
// MUI
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import CircularProgress from '@material-ui/core/CircularProgress'
// ROUTER
import { Link } from 'react-router-dom'

export default function FollowUpRequest({ request }) {

    const dispatch = useDispatch()

    const [ loading, setLoading ] = useState(false)

    const { _id, username, profileImg, createdAt } = request.follower_id    

    const handleIgnore = () => dispatch(ignoreRequest(_id, setLoading))

    const handleAccept = () => dispatch(acceptRequest(_id, setLoading))

    return (
        <div> 
            <ListItem style={{minWidth: 430}} >
                
                <Link to={`/users/${_id}`}> 
                <ListItemAvatar >
                    <Avatar alt='Remy Sharp' src={profileImg} />
                </ListItemAvatar>
                </Link>
               
                <ListItemText
                    primary={username}
                    secondary={moment(createdAt).startOf('hour').fromNow()}
                />
             
                <ListItemSecondaryAction>
                    <Button disabled={loading} variant='contained' onClick={handleAccept} size='small' color='primary' endIcon={ loading && <CircularProgress size='small' /> } > Aceptar </Button>

                    <Button disabled={loading} variant='contained' onClick={handleIgnore} size='small' color='default' > Ignorar </Button>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant='inset' component='li' />
        </div> 
    )
}
