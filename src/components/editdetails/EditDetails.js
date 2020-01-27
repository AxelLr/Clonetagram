import React, { useState, useEffect } from 'react'
// REDUX
import { addUserDetails } from '../../redux/actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
// MUI
import ToolTip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function EditDetails(props) {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.UI.loading)

    const { description, user_id } = props
    console.log(description)

    const [ open, setOpen ] = useState(false)
    const [ details, setDetails ] = useState('')
    const [ errors, setErrors ] = useState('')

    useEffect(() => {    
        if(description) {
            setDetails(description)
        } 
    }, [description])

    useEffect(() => {
        if(!loading && !errors) {
            setOpen(false)
        }
       }, [loading, errors])

    const handleEdit = () => {

        if(details.trim() === '') {
            setErrors('No debe estar vacío')
        }
        dispatch(addUserDetails(details, user_id))
    }

    const handleOpen = () => {
        setOpen(true)
        setDetails(description)
    }

    const handleClose = () => {
        setOpen(false)
        setErrors('')
    }

    return (
        <div>
            <ToolTip title="Editar Perfil" placement='left' > 
                <IconButton onClick={handleOpen} aria-label='delete' style={{height: 50, color: '#e5e5e5'}}>
                    < EditIcon />                   
                </IconButton>
            </ToolTip> 

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
              <div style={{margin: '20px auto 20px auto', width:'85%'}}> 
                <TextField
                    tpye="text"
                    label="Descripción"
                    multiline
                    rows="4"
                    placeholder='Añade una descripción a tu perfil'
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    fullWidth
                />
              </div>
                { errors && <p style={{color: 'red', fontFamily: 'Open Sans', marginLeft: 40}}> {errors} </p>  }
                
                <DialogActions>
                    <Button onClick={handleEdit} disabled={loading} variant='contained' color="primary">
                    Guardar { loading && <CircularProgress style={{marginLeft: 5}} size={20} /> } 
                    </Button>
                    <Button onClick={handleClose} variant='contained' style={{backgroundColor: 'red'}} color="secondary">
                    Cancelar
                    </Button> 
                </DialogActions>
            </Dialog>
        </div>
    )
}
