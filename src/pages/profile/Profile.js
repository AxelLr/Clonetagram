import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfilePosts from '../../components/posts/profileposts/ProfilePosts'
import ProfileImg from '../../components/profile-img/ProfileImg'
import AddPost from '../../components/posts/addpost/AddPost'
import EditDetails from '../../components/editdetails/EditDetails'
import HandleFollow from '../../components/handleFollow/HandleFollow'
import SubsFollowersList from '../../components/subs-followers-list/SubsFollowersList'
import noProfileImg from '../../images/noprofileimg2.png'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../../redux/actions/DataActions'
import { getUserProfile, getConnectedUser } from '../../redux/actions/UserActions'
// MUI
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import CircularProgress from '@material-ui/core/CircularProgress'
import Skeleton from '@material-ui/lab/Skeleton'

export default function Profile(props) {

    const [userProps, setUserProps ] = useState(true)
    const [ open, setOpen ] = useState(false)

    const dispatch = useDispatch()
    const user_id = props.match.params.id

    const loading = useSelector(state => state.UI.loading)
    const loadingProfile = useSelector(state => state.UI.loadingProfile)
    const connectedUser = useSelector(state => state.user.loggedUser)
    const userProfile = useSelector(state => state.data.selectedProfile)
    const { subscriptions, followers, description, profileImg, username } = userProfile
    const userPosts = useSelector(state => state.data.selectedPosts)

    useEffect(() => {
    dispatch(getConnectedUser())
    dispatch(getUserProfile(user_id))
    dispatch(getUserPosts(user_id))
        
    }, [dispatch, user_id])

     // AGREGAR ELIMINAR DATOS DEL PERFIL AL CERRAR EL COMPONENTE

    const setFollowers = () => {
    setOpen(true)
    setUserProps(true)
    }

    const setSubscriptions = () => {
        setOpen(true)
        setUserProps(false)
    }
   
    return (
        <div className='profile-container'>
            <Link to='/Home'>
               < HomeIcon style={{color: '#e5e5e5', margin: 25, fontSize: 40}} />
            </Link >
              
            { connectedUser._id === user_id && < AddPost /> }
            <div className='profile-data'>
                <div className='data-container'>

            { loadingProfile ? 
                <div>  
                  <img src={noProfileImg} alt='loading profile' width={170} height={170} style={{cursor: 'pointer'}}/>
                </div>
            
            : < ProfileImg src={profileImg} user_id={user_id} connectedUser={connectedUser._id} />
            } 
                <div className='profile-info'>
                        <span style={{display: 'flex', alignItems: 'flex-end' }}> <h1> {loadingProfile ? < Skeleton width={350} animation="wave" /> : <div> {username} </div> }  </h1> { connectedUser._id !== user_id &&  < HandleFollow userProfile={userProfile} connectedUser={connectedUser} /> } </span> 
                        <p>  
                        { loadingProfile ? 
                        <div> 
                            < Skeleton width={350} animation="wave" />
                            < Skeleton width={350} animation="wave" />
                        </div> : 
                        
                        <div>{description && description } </div> } </p>
                        
                        <div className='profile-button-container'> 
                            <Button  
                                variant="contained"
                                color="primary"
                                style={{margin: '25px auto 25px auto', background: '#e5e5e5', color: 'black'}}onClick={setFollowers} >  { followers && followers.length } Seguidores </Button>
                            <Button 
                                variant="contained"
                                color="primary"
                                style={{margin: '25px auto 25px auto', background: '#e5e5e5', color: 'black'}} onClick={setSubscriptions}> { subscriptions && subscriptions.length } Seguidos </Button>

                            < SubsFollowersList userProps={userProps} open={open} setOpen={setOpen} userList={userProps ? followers : subscriptions } />
                         </div>     
                    </div>
                    {connectedUser._id === user_id &&
                    < EditDetails user_id={user_id} description={description} />
                    }
                </div>   
            </div>
            <div className='profile-posts-container'> 
           
           { loading ? <div style={{display: 'flex', width: '100%', height: '20vh'}}> <CircularProgress style={{margin: 'auto'}} size={60} /> </div> :  <ProfilePosts posts={userPosts} /> } 
            </div>
         
        </div>
    )
}
