import React,{ useEffect, useState } from 'react'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
// ACTIONS
import { followUser, unfollowUser, cancelRequest } from '../../../redux/actions/UserActions'
// MUI
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

export default function HandleFollow({ userProfile, connectedUser }) {

   const user_id = userProfile._id

   console.log(userProfile)

   const dispatch = useDispatch()
   const [isFollowed, setIsFollowed] = useState()
   const loadingSubscription = useSelector(state => state.UI.loadingSubscription)

   useEffect(() => {

        let subscription = connectedUser.subscriptions && connectedUser.subscriptions.filter(subscript => subscript.user_id === user_id)
        subscription && subscription.length >= 1 ? setIsFollowed(true) : setIsFollowed(false) 

   }, [connectedUser, user_id])

    const handleFollow =  () => {
     dispatch(followUser(user_id))
    }

   const handleUnfollow = () => {
     dispatch(unfollowUser(user_id))
   }

   const handleRequest = () => {
    dispatch(cancelRequest(user_id))
   }

  let requestAlreadySended = userProfile && userProfile.followUpRequests && userProfile.followUpRequests.find(req => req.follower_id === connectedUser._id)

  if(requestAlreadySended) return (

    <Button disabled={loadingSubscription} onClick={handleRequest} style={{marginLeft: 10}} variant='contained' 
    color='primary' size='small' > Solicitud Enviada { loadingSubscription && <CircularProgress style={{marginLeft: 5}} size={20} /> } 
    </Button> 
  )   

    return (
        <div>
            { isFollowed ? 
            
            <Button disabled={loadingSubscription} onClick={handleUnfollow} style={{marginLeft: 10}} variant='contained' 
            color='primary' size='small' > Siguiendo { loadingSubscription && <CircularProgress style={{marginLeft: 5}} size={20} /> } 
            </Button> 
            
            : 

            <Button disabled={loadingSubscription} onClick={handleFollow} style={{marginLeft: 10}} variant='contained' 
            size='small' > Seguir { loadingSubscription && <CircularProgress style={{marginLeft: 5}} size={20} /> }  
            </Button> }
        </div>
    )
}
