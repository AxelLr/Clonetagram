import React,{Fragment, useState } from 'react'
// REDUX
import { useDispatch } from 'react-redux'
import { editProfileImage } from '../../redux/actions/UserActions'
// MUI 
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function ProfileImg(props) {

    const { user_id, connectedUser } = props

    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const dispatch = useDispatch()

    const selectFile = (e) =>  {

        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file, file.name) 
        console.log(formData)
   
        if(formData) {
            setLoading(true)
            dispatch(editProfileImage(formData, setLoading))
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
            {connectedUser === user_id ?
            < Fragment>
            { loading ? <CircularProgress style={{}} size={130} />            
            : 
            <img src={props.src} alt='profile' width={170} height={170} onClick={() => setOpen(true)} style={{cursor: 'pointer'}}/> } 
            
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
        </Fragment>
        : 
        <Fragment> 
             <img src={props.src} alt='profile' width={150} height={150} />
        </Fragment>
        }
        </div> 
    )
}



