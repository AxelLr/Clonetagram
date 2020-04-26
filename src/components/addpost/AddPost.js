import React,{ useState } from 'react'
// REDUX
import { useDispatch } from 'react-redux'
import { newPost } from '../../redux/actions/PostsActions'
// MUI 
import AddBoxIcon from '@material-ui/icons/AddBox'
import TextField from '@material-ui/core/TextField'
import ToolTip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import imagePreview from '../../util/images/image-preview.png'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function AddPost() {

    const dispatch = useDispatch()

    const [ file, setFile ] = useState('')
    const [image, setImage ] = useState('')
    const [content, setContent ] = useState('')
    const [open, setOpen] = useState(false)
    const [errors, setErrors ] = useState('')
    const [loading, setLoading] = useState(false)

    const selectFile = (e) =>  {
        e.preventDefault()
        setFile(e.target.files[0])
        e.target.files[0] ? setImage(URL.createObjectURL(e.target.files[0])) : setImage('')    
    }

    const pickFile = (e) => {
        e.preventDefault()
        setErrors('')
        const button = document.getElementById('file-input')
        button.click()
    }
    
    const handleOpen = () => setOpen(true)
   
    const handleClose = () => {
        setOpen(false)
        setImage('')
        setContent('')
        setErrors('')
    }
    
    const uploadPost = () => {
        if(image) {
           
            const fileType = file.name.split('.').pop()

            if(fileType !== ('jpg' || 'jpeg')) return setErrors('Formato de imágen inválido. Solo jpg o jpeg.')
            
            let formData = new FormData()
            formData.append('image', file, file.name) 
            formData.append('description', content) 
            dispatch(newPost(formData, setOpen, setLoading, setErrors))
            setErrors('')
        } else {
            setErrors('Debes seleccionar una imágen primero')
        }
    }

    return (
        <div className='add-post-container' placement='top'>
            <ToolTip  title='Nuevo Post'> 
                < AddBoxIcon onClick={handleOpen} />
            </ToolTip>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
                <DialogTitle> Nuevo Post </DialogTitle>

                <DialogContent>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        
                        <input 
                            hidden='hidden' 
                            id='file-input'
                            type='file' 
                            placeholder='select an image' 
                            onChange={selectFile}
                        />

                        { image ?
                            <img src={image} width={400} style={{margin: 'auto'}} height={400} alt='new post' /> 
                        :   <img src={imagePreview} width={250} style={{margin: 'auto'}} height={250} alt='preview' /> 
                        }
                        
                        <Button onClick={pickFile} style={{marginTop: 30}} variant='outlined' color="primary">
                            Seleccionar Imágen
                        </Button>

                        <TextField
                            style={{marginTop: 30}}
                            name="descripcion"
                            tpye="text"
                            multiline
                            rows="4"
                            placeholder="Si asi lo quieres, añade una descripción..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            fullWidth
                            inputProps={{ maxLength: 200 }}                            
                        />
                    </div>
                        <p style={{color:'red', fontFamily: 'Open Sans', margin: 'auto'}}>  { errors && errors } </p>
                </DialogContent>

                <DialogActions>
                        
                    <Button disabled={loading || errors} onClick={uploadPost} variant='contained' color="primary">
                        Publicar! { loading && <CircularProgress style={{marginLeft: 15}} size={30} /> } 
                    </Button>

                    <Button onClick={handleClose} variant='contained' style={{backgroundColor: 'red'}} color="secondary">
                        Cancelar
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}
