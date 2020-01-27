import React,{ useState } from 'react'
// REDUX
import { addReply } from '../../../redux/actions/DataActions'
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

export default function AddRepply(props) {

const dispatch = useDispatch()

const [content, setContent] = useState('')
const classes = useStyles()

const handleComment = (e) => {
    e.preventDefault()
   if(content) {
       console.log('nani')
    dispatch(addReply({ content }, props.comment._id ))  
    setContent('')  
   }   
}

  return (
    <form  className={classes.root} noValidate autoComplete="off">

                <TextField
                    tpye="text"
                    label="Escribe un mensaje"
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
