import React,{ useEffect, useState, Fragment } from 'react'
// COMPONENTS
import ProfilePosts from './components/profile-posts/ProfilePosts'
import ProfileImg from './components/ProfileImg'
import AddPost from '../../components/addpost/AddPost'
import HandleFollow from './components/HandleFollow'
import SubsFollowersList from './components/SubsFollowersList'
import EditAccountDetails from './components/edit-account-details/EditAccountDetails'
import PrivateAccountSign from './components/PrivateAccountSign'
// IMAGE
import noProfileImg from '../../util/images/noprofileimg2.png'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/actions/UserActions'
// MUI
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton'

export default function Profile(props) {
    
    const dispatch = useDispatch()
    const user_id = props.match.params.id

    const [ showingFollowers, setShowingFollowers ] = useState(true)
    const [ loadingProfile, setLoadingProfile ] = useState(false)
    const [ open, setOpen ] = useState(false)

    const connectedUser = useSelector(state => state.user.loggedUser)
    const userProfile = useSelector(state => state.profile.profile)

    const { subscriptions, followers, description, profileImg, username } = userProfile

    let isLoggedUser = connectedUser._id === user_id
  
    useEffect(() => {
        dispatch(getUserProfile(user_id, setLoadingProfile))   
    }, [dispatch, user_id])

    const setFollowers = () => {
    setOpen(true)
    setShowingFollowers(true)
    }

    const setSubscriptions = () => {
        setOpen(true)
        setShowingFollowers(false)
    }

    let hasPermissions = (followers && followers.find(foll => foll.user_id._id === connectedUser._id)) || !userProfile.private || connectedUser._id === user_id
  
    return (
 
        <section className='profile-container'>

            { isLoggedUser && < AddPost /> }
            <div className='profile-data'>
                <div className='data-container'>

            { loadingProfile ? 
                <div>  
                  <img src={noProfileImg} alt='loading profile' />
                </div>
            
            : < ProfileImg src={profileImg} isLoggedUser={isLoggedUser} />
            } 
                <div className='profile-info'>
                        <span style={{display: 'flex', alignItems: 'flex-end' }}> <h1>
                         { loadingProfile ? < Skeleton width={350} animation="wave" /> : <div> {username} </div> } 
                         </h1> { connectedUser._id !== user_id && !loadingProfile && < HandleFollow userProfile={userProfile} connectedUser={connectedUser} /> } </span> 
                        <div>  
                        { loadingProfile ? 
                        <div style={{marginLeft: 50}}> 
                            < Skeleton width={350} animation="wave" />
                            < Skeleton width={350} animation="wave" />
                        </div> 

                        : 

                        <p> { description && description } </p> } </div>
                        
                        <div>
                            < SubsFollowersList showingFollowers={showingFollowers} open={open} setOpen={setOpen} userList={showingFollowers ? followers : subscriptions } />
                         </div>     
                    </div>
                    { isLoggedUser && <EditAccountDetails connectedUser={connectedUser} description={description} /> }
                </div>
            </div>
            { !loadingProfile &&
           <div className='profile-button-container'>
                  <Button  
                      variant="contained"
                      color="primary"
                      style={{ background: '#e5e5e5', color: 'black'}}onClick={hasPermissions && setFollowers} >  { followers && followers.length } Seguidores 
                  </Button>
                  <Button 
                      variant="contained"
                      color="primary"
                      style={{ background: '#e5e5e5', color: 'black'}} onClick={hasPermissions && setSubscriptions}> { subscriptions && subscriptions.length } Seguidos
                  </Button>
           </div>
          }   
                
            <div className='profilePosts-container'> 
            { !hasPermissions && !loadingProfile ? <PrivateAccountSign /> : <ProfilePosts user_id={user_id} /> } 
           </div>        
        </section>

    )
}
