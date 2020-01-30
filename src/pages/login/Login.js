import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// MUI Stuff
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
// REDUX
import { loginUser } from '../../redux/actions/UserActions'


export default function Login(props) {

const initialState = {
  email: '',
  password: ''
}

const dispatch = useDispatch()
const errors = useSelector(state => state.user.errors)
const loading = useSelector(state => state.user.loading)
const [values, setValues] = useState(initialState)

console.log(errors)

const handleChange = (e) => {
  setValues({
    ...values,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = (e) => 
{
  e.preventDefault()
  dispatch(loginUser(values, props.history))
  
 }
    return (
      <div className='login-container'>

          <form onSubmit={handleSubmit}>

          <Typography variant='h3'>
              Iniciar Sesión

            </Typography>

            <TextField
              error={errors ? true : false}
              id='email'
              name='email'
              type='email'
              value={values.email}
              onChange={handleChange}
              fullWidth
              required
              label='E-mail'
              
            />
            <TextField
              error={errors ? true : false}
              inputProps={{ minLength: 6, maxLength: 20 }}
              id='password'
              name='password'
              type='password'
              value={values.password}
              onChange={handleChange}
              fullWidth
              required
              label='Contraseña'
    
            />
            { errors && <p style={{color: 'red', fontFamily: 'Open Sans'}}> {errors[0].msg} </p>  }
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
              style={{margin: '25px auto 25px auto'}}
            >
            Ingresar!

            { loading && <CircularProgress style={{marginLeft: 15}} size={30} /> } 
              
            </Button>

            <br />
       
            <small>
            Si no tienes una cuenta, puedes <Link style={{textDecoration: 'none', color: '#046B86'}} to="/Register"> Registrarte Aquí </Link>
            </small>
          </form>
      </div>
    );
}

