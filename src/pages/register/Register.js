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
      <div className='register-container'>

            <Typography variant='h3'>
              Regístrate!
            </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              error={errors.email ? true : false}
              required
              id='email'
              name='email'
              type='email'
              label={errors ? errors.email : "Email"}
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
              label={errors.password ? errors.password : "Contraseña"}
              value={values.password}
              onChange={handleChange}
              fullWidth
              required
    
            />
             <TextField
              required
              error={errors.confirmPassword ? true : false}
              inputProps={{ minLength: 6, maxLength: 20 }}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label={errors.confirmPassword ? errors.confirmPassword : "Confirmar contraseña"}
              value={values.confirmPassword}
              onChange={handleChange}
              fullWidth
            />
             <TextField
             inputProps={{ minLength: 4, maxLength: 20 }}
              error={errors.username ? true : false}
              id="username"
              name="username"
              type="text"
              label={errors ? errors.username : "Nombre"}
              value={values.username}
              onChange={handleChange}
              helperText="Todos veran tu nombre"
              fullWidth
              required
            />
            {/* {props.UI.errors.general && <h4 style={{color: 'red', margin: 5}}> {props.UI.errors.general} </h4>} */}
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="secondary"
              style={{margin: '25px auto 25px auto'}}
            >
            Registrarse!

            { loading && <CircularProgress style={{marginLeft: 15}} size={30} /> } 
              
            </Button>

            <br />
       
            <small>
            Tienes una cuenta? <Link to="/LogIn"> Inicia sesión </Link>
            </small>
          </form>
      </div>
    );
}

