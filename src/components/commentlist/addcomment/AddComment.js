import React, { useState } from 'react'
// REDUX
import { addComment } from '../../../redux/actions/DataActions'
import { useDispatch } from 'react-redux'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      width: '100%'
    },
  },
}));

export default function AddComment(props) {

const dispatch = useDispatch()

const [content, setContent] = useState('')
const classes = useStyles()

const handleComment = (e) => {
    e.preventDefault()
   if(content) {
     console.log(content)
    dispatch(addComment({ content }, props.selectedPost._id ))  
    setContent('')  
   }   
}

  return (
    <form  className={classes.root} noValidate autoComplete="off">

                <TextField
                    tpye="text"
                    label="Añade un comentario"
                    rows="2"
                    variant='filled'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleComment(e) 
                        }
                      }}    
                />
    </form>
  );
}