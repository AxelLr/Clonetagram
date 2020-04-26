import React from 'react'
// MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
// REDUX
import { useDispatch } from 'react-redux'
// ACTIONS
import { editProfileImage } from '../../../../../redux/actions/AuthenticationActions'

export default function EditImage({ open, setOpen }) {
    const dispatch = useDispatch()

    const selectFile = (e) =>  {

        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file, file.name) 
        console.log(formData)
   
        if(formData) {
            dispatch(editProfileImage(formData))
            setOpen(false)
        }
    }

    const pickFile = (e) => {
        e.preventDefault()
        const button = document.getElementById('file-input')
        button.click()
    }

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" >
                <DialogTitle> Cambiar foto de perfil </DialogTitle>

                <DialogContent>
                    <form style={{display: 'flex', flexDirection: 'column'}}>

                        <input required hidden='hidden' id='file-input'
                        type='file' placeholder='select an image' onChange={selectFile} />
                        
                        <Button onClick={pickFile} variant='outlined' color="primary">
                            Subir Foto 
                        </Button>

                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant='contained' color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
