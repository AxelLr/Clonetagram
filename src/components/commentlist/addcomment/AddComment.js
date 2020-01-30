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
  input: {
    background: '#181818'
  }
}));

export default function AddComment(props) {

const dispatch = useDispatch()

const [loading, setLoading ] = useState(false)
const [content, setContent] = useState('')
const classes = useStyles()

const handleComment = (e) => {
    e.preventDefault()
   if(content) {
    setLoading(true)
    console.log(content)
    dispatch(addComment({ content }, props.selectedPost._id, setLoading ))  
    setContent('')  
   }   
}

  return (
    <form  className={classes.root} noValidate autoComplete="off">

                <TextField
                    className={loading && classes.input}
                    disabled={loading}
                    type="text"
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