import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// MUI Stuff
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
// REDUX
import { registerUser } from '../../redux/actions/UserActions'
import { SET_ERRORS } from '../../redux/reducers/types'


export default function Register(props) {

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  username: ''
}

const dispatch = useDispatch()
const errors = useSelector(state => state.user.errors)
const loading = useSelector(state => state.user.loading)
const [values, setValues] = useState(initialState);

const handleChange = (e) => {
  setValues({
    ...values,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = (e) => {

if(values.password === values.confirmPassword) {

  e.preventDefault()
  dispatch(registerUser(values, props.history))
} else {
  
  e.preventDefault()
  dispatch({type: SET_ERRORS, payload: { confirmPassword: 'Las contraseñas deben coincidir' }})
}
  
 }
    return (
      <div className='login-container'>


          <form onSubmit={handleSubmit}>
            
          <Typography variant='h3'>
              Regístrate!
            </Typography>
            <TextField
              error={errors.email ? true : false}
              required
              id='email'
              name='email'
              type='email'
              label='E-mail'
              helperText={errors && errors.email}
              value={values.email}
              onChange={handleChange}
              fullWidth
              
            />
            <TextField
              error={errors.password ? true : false}
              inputProps={{ minLength: 6, maxLength: 20 }}
              id='password'
              name='password'
              type='password'
              label='Contraseña'
              value={values.password}
              onChange={handleChange}
              helperText={errors && errors.password}
              fullWidth
              required
    
            />
             <TextField
              required
              error={errors.confirmPassword ? true : false}
              inputProps={{ minLength: 6, maxLength: 20 }}
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              label= 'Confirmar contraseña'
              value={values.confirmPassword}
              onChange={handleChange}
              helperText={errors.confirmPassword && errors.confirmPassword}
              fullWidth
            />
             <TextField
             inputProps={{ minLength: 4, maxLength: 20 }}
              error={errors.username ? true : false}
              id='username'
              name='username'
              type='text'
              label= 'Nombre completo (todos veran tu nombre)'
              value={values.username}
              onChange={handleChange}
              helperText={errors && errors.username}
              fullWidth
              required
            />
           
            <Button
              disabled={loading}
              type='submit'
              variant='contained'
              color='primary'
              style={{margin: '25px auto 25px auto' }}
            >
            Registrarse!

            { loading && <CircularProgress style={{marginLeft: 15}} size={30} /> } 
              
            </Button>

            <br />
       
            <small>
            Tienes una cuenta? <Link  style={{textDecoration: 'none', color: '#046B86'}} to='/'> Inicia sesión </Link>
            </small>
          </form>
      </div>
    );
}
