import React from 'react'
import DeletePost from './components/DeletePost'
import moment from 'moment'
import { Link } from 'react-router-dom'
import HandleLikes from './components/HandleLikes'
// REDUX
import { useSelector } from 'react-redux'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
// ICONS
import IconButton from '@material-ui/core/IconButton'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'

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

export default function Post({ post }) {

  const onSinglePost = useSelector(state => state.UI.onSinglePost)

  const connectedUser = useSelector(state => state.user.loggedUser)
 
  const { imageURL, description, date, userRef, _id, commentCount } = post

  const classes = useStyles()
 
  return (
      <Card elevation={8}>
          <CardHeader
              avatar={
                <Avatar aria-label='profile-pic' className={classes.avatar}>
                  <Link to={`/users/${userRef && userRef._id}`}> <img height={50} width={50} src={ userRef && userRef.profileImg} alt='profile-pic' /> </Link>
                </Avatar>
              }
              action={
              <div> 
                { userRef && userRef._id === connectedUser._id && < DeletePost post_id={_id} /> }
              </div>
              }
              title={userRef && userRef.username}
              subheader={moment(date).format('LLL')}
          />

          <img src={imageURL} style={{objectFit: 'cover', backgroundColor: '#3C3C3C'}} height={480} width={'100%'} alt='Post' /> 
        
          <CardActions style={{ padding: 0 }} disableSpacing>
            < HandleLikes post={post} /> 
            < Link style={{textDecoration: 'none' }} to={`/posts/${_id}`}> 
          { !onSinglePost && <IconButton> < SpeakerNotesIcon/> {commentCount} </IconButton>  }
            </Link>
          </CardActions>

          <CardContent style={{ padding: '0px 0px 20px 10px'}}> 
            <Typography color='textSecondary' component='p'>
              { description }
            </Typography>
          </CardContent>
      </Card>
  )
}