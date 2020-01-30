import React from 'react'
import DeletePost from './deletepost/DeletePost'
import moment from 'moment'
import { Link } from 'react-router-dom'
import HandleLikes from './handlelikes/HandleLikes'
// REDUX
import { useSelector } from 'react-redux'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

export default function Post(props) {

  const onSinglePost = useSelector(state => state.UI.onSinglePost)

  const connectedUser = useSelector(state => state.user.loggedUser)
 
  const { imageURL, description, date, userRef, _id, commentCount } = props.post

  const classes = useStyles()
 
  return (
   
    <Card elevation={8} style={{objectFit: 'cover'}}>
      <CardHeader
        avatar={
          <Avatar aria-label='profile-pic' className={classes.avatar}>
            <Link to={`/users/${userRef && userRef._id}`}> <img height={50} width={50} src={ userRef && userRef.profileImg} alt='profile-pic' /> </Link>
          </Avatar>
        }
        action={
        <div> 
          { userRef && userRef._id === connectedUser._id && < DeletePost post_id={_id}  /> }
        </div>
        }
        title={userRef && userRef.username}
        subheader={moment(date).format('LLL')}
      />

      <img src={imageURL} height={350} width={'100%'} alt='Post' /> 

      <CardContent style={{margin: '15px 0px 0px 15px', padding: 0}}>
        <Typography color='textSecondary' component='p' style={{minHeight: 20, maxHeight: 20}}>
        { description }
        </Typography>

        <Typography style={{marginTop: 20 }} variant='body2' color='textSecondary' component='p'>
       
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        < HandleLikes post={props.post} /> 
        < Link style={{textDecoration: 'none' }} to={`/posts/${_id}`}> 
      { !onSinglePost && <IconButton>  < SpeakerNotesIcon/>{commentCount}  </IconButton>  }
        </Link>
      </CardActions>
    </Card>
  
  )
}