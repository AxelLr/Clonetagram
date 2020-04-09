import React,{ useState, useEffect } from 'react'
// REDUX
import { useDispatch } from 'react-redux'
// ACTIONS
import { addUserDetails } from '../../../../../redux/actions/UserActions'
// MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function EditDescription({ description, open, setOpen }) {

    const dispatch = useDispatch()

    const [ loading, setLoading ] = useState(false)
    const [ details, setDetails ] = useState('')
    const [ errors, setErrors ] = useState('')

    useEffect(() => {    
            setDetails(description)
    }, [description])

    const handleEdit = () => {

        if(details.trim() === '') {
            setErrors('No debe estar vacío')
        }
        setLoading(true)
        dispatch(addUserDetails(details, setLoading, setOpen))
    }

    const handleClose = () => {
        setOpen(false)
        setErrors('')
    }

    return (
        <div>
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
