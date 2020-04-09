import React,{ useState } from 'react'
// REDUX
import { useDispatch } from 'react-redux'
// ACTIONS
import { resetPassword } from '../../../redux/actions/AuthenticationActions'
// MUI
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

export default function ResetPasswordDialog({ open, setOpen, hasPassword, provider, values}) {

    const dispatch = useDispatch()
    const [ handleReset, setHandleReset] = useState({
        loading: false,
        success: null
    })

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" >
                <DialogTitle> OOPS! </DialogTitle>
                <DialogContent>
                    <p style={{width: '100%', textAlign: 'justify', fontFamily: 'Open Sans'}}> 
                      { !hasPassword ? 
                      `Al parecer, la cuenta con la que intentas ingresar existe, pero no cuenta con una contraseña establecida. Si quieres establecer una nueva contraseña, haz clic en Reestablecer Contraseña.
                       Tambien puedes volver atras e ingresar a tu cuenta a través de` : 
                      `Haz clic en reestablecer contraseña si deseas recuperar tu cuenta. Revisa tu correo (${values.email}), recibiras un mensaje para continuar con el proceso.` 
                       }  
                   </p>

                { handleReset.success && <p> El link ha sido enviado exitosamente, revisa tu correo. </p> }
                </DialogContent>

                <DialogActions>
                <Button disabled={handleReset.loading} onClick={() => dispatch(resetPassword(values.email, setHandleReset, setOpen))} variant='contained' color="primary">
                   Reestablecer Contraseña 
                </Button>
                <Button disabled={handleReset.loading} onClick={() => setOpen(false)} variant='contained' color="primary">
                   Volver atrás
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
