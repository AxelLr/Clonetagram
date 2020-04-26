import React,{ useState } from 'react'
// REDUX
import { removeReply } from '../../../../../../../../../redux/actions/CommentsActions'
import { useDispatch } from 'react-redux'
// MUI
import ToolTip from '@material-ui/core/Tooltip'
// ICONS
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function DeleteReply({ reply, comment }) {
    
    const dispatch = useDispatch()
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false) 

    const handleDelete = () => dispatch(removeReply(comment._id, reply._id, setLoading, setOpen))
    
    return (
            <div>
                <ToolTip title="Borrar comentario" placement="bottom">
                    <IconButton onClick={ () => setOpen(true)} > 
                    <CancelIcon color="primary"/>
                    </IconButton> 
                </ToolTip>
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" >
                    <DialogTitle> Seguro que quieres borrar tu comentario ?  </DialogTitle>
                    <DialogActions>
                            
                        <Button disabled={loading} onClick={handleDelete} variant='contained' color="primary">
                        Borrar { loading && <CircularProgress style={{marginLeft: 15}} size={30} /> } 
                        </Button>

                        <Button onClick={() => setOpen(false)} variant='contained' style={{backgroundColor: 'red'}} color="secondary">
                            Cancelar
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
    )
}
