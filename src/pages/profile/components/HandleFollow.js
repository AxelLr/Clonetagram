import React,{ useEffect, useState } from 'react'
// REDUX
import { useDispatch } from 'react-redux'
// ACTIONSs
import { followUser, unfollowUser, cancelRequest } from '../../../redux/actions/UserActions'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

export default function HandleFollow({ userProfile, connectedUser }) {

   const user_id = userProfile._id
   const dispatch = useDispatch()

   const [ isFollowed, setIsFollowed ] = useState()
   const [ loading, setLoading ] = useState(false)

   useEffect(() => {

        let subscription = connectedUser.subscriptions && connectedUser.subscriptions.find(subscript => subscript.user_id._id === user_id)
        subscription ? setIsFollowed(true) : setIsFollowed(false) 

   }, [connectedUser, user_id])

  const handleFollow =  () => dispatch(followUser(user_id, setLoading, userProfile.private, { userProfile, connectedUser }))

  const handleUnfollow = () => dispatch(unfollowUser(user_id, setLoading, connectedUser._id))

  const handleRequest = () => dispatch(cancelRequest(user_id, setLoading))

  let requestAlreadySended = userProfile && userProfile.followUpRequests && userProfile.followUpRequests.find(req => req.follower_id._id === connectedUser._id)

  if(requestAlreadySended) return (

    <Button disabled={loading} onClick={handleRequest} style={{marginLeft: 10}} variant='contained' 
    color='primary' size='small' > Solicitud Enviada { loading && <CircularProgress style={{marginLeft: 5}} size={20} /> } 
    </Button> 
  )   

    return (
        <div>
            { isFollowed ? 
            
              <Button disabled={loading} onClick={handleUnfollow} style={{marginLeft: 10}} variant='contained' 
              color='primary' size='small' > Siguiendo { loading && <CircularProgress style={{marginLeft: 5}} size={20} /> } 
              </Button> 
              
              : 

              <Button disabled={loading} onClick={handleFollow} style={{marginLeft: 10}} variant='contained' 
              size='small' > Seguir { loading && <CircularProgress style={{marginLeft: 5}} size={20} /> }  
              </Button>
            }
        </div>
    )
}
