import React,{ useState, useEffect } from 'react'
// MUI
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
// REDUX
import { useDispatch } from 'react-redux'
// ACTIONS
import { setPrivacy } from '../../../../../redux/actions/UserActions'

export default function HandlePrivacy({ connectedUser }) {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(connectedUser)
    }, [connectedUser])

    const [ loading, setLoading ] = useState(false)

    const HandlePrivacyChange = () => {
        dispatch(setPrivacy(setLoading))
    }

    return (
        <FormControl component="fieldset">
        <FormLabel component="legend"> Editar privacidad </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Switch  name="gilad" />}
            checked={ connectedUser.private}
            label={ connectedUser.private ? 'Cuenta Privada' : 'Cuenta Pública'}
            onChange={HandlePrivacyChange}
            disabled={loading}
          />
           </FormGroup>
           </FormControl>
    )
}
