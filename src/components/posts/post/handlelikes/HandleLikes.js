import React from 'react'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { likeAPost, dislikeAPost } from '../../../../redux/actions/DataActions'
// MUI
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function HandleLikes(props) {

    const dispatch = useDispatch()

    const connectedUser = useSelector(state => state.user.loggedUser)

    const { likes, _id } = props.post

    const liked = connectedUser && likes && likes.filter(like => like.user === connectedUser._id).length > 0 ? true : false

    console.log(liked)

       const handleLike = () => {
        dispatch(likeAPost(_id))
    }

    const handleDislike = () => {
        dispatch(dislikeAPost(_id))
    }

    return (
            <div>
                { liked ?
                      <IconButton onClick={handleDislike}  aria-label='add to favorites'>
                      <FavoriteIcon  /> { likes && likes.length }
                  </IconButton>    
           
                :  
                <IconButton  onClick={handleLike} aria-label='add to favorites'>
                <FavoriteBorderIcon  /> { likes && likes.length }
            </IconButton> 
          
                }            
            </div>
    )
}







