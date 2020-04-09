import React, { useState, useEffect } from 'react'
import { deletePost } from '../../../redux/actions/PostsActions'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
// MUI
import ToolTip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
// ICONS
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

export default function DeletePost(props) {

    const [open, setOpen] = useState(false)

    const deleting = useSelector(state => state.UI.deleting)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!deleting ) {
            setOpen(false)
        }
       }, [deleting])

    const handleDelete = () => {
        dispatch(deletePost(props.post_id))
    }

    return (
        <div >
            <ToolTip title="Borrar Post" placement="bottom">
                <IconButton onClick={() => setOpen(true)}> 
                    <DeleteIcon color="primary" />
                </IconButton> 
            </ToolTip>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" >
                
                <DialogTitle> Estas Seguro de que quieres borrar esta publicacíon ? </DialogTitle>

                <DialogActions>
                    <Button disabled={deleting} onClick={handleDelete} variant='contained' color="primary">
                    Si { deleting && <CircularProgress style={{marginLeft: 15}} size={30} /> } 
                    </Button>
                    <Button onClick={() => setOpen(false)} variant='contained' color="secondary">
                    Cancelar
                    </Button> 
                </DialogActions>
            </Dialog>
        </div>
    )
}
