import React,{ useState } from 'react'
// FORMIK
import { Formik, Form } from 'formik'
// ROUTER 
import { Link } from 'react-router-dom'
// REDUX
import { loginUser, checkEmail } from '../../redux/actions/AuthenticationActions'
import { useDispatch, useSelector } from 'react-redux'
// MUI
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
// ICONS
import FacebookIcon from '@material-ui/icons/Facebook'
// STYLES
import { makeStyles } from '@material-ui/core/styles'
// YUP
import { loginSchema, emailCheckSchema } from '../../util/ValidationSchema'
// IMAGE
import landingImage from '../../util/images/landing-image.jpg'
// COMPONENTS 
import LoadingAuthentication from '../../components/LoadingAuthentication'
import ResetPasswordDialog from './components/ResetPasswordDialog'

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: 55,
    height: 40,
    fontSize: 2
}
}))

export default function Login(props) {

  const [ openDialog, setOpenDialog ] = useState(false)
  const [ tryCount, setTryCount ] = useState(0)

  const userHasPassword = useSelector(state => state.user.userHasPassword)
  const serverErrors = useSelector(state => state.user.errors)

  const classes = useStyles()
  const dispatch = useDispatch()

  return (
      <Formik
             
              initialValues={ userHasPassword === true ? { email: '', password: '' } : { email: '' } }
              validationSchema={userHasPassword === true ? loginSchema : emailCheckSchema }
              onSubmit={(values, { setSubmitting }) => {
                
                userHasPassword === null && dispatch(checkEmail(values, setSubmitting, setOpenDialog))
                userHasPassword === true && dispatch(loginUser(values, setSubmitting ,setOpenDialog, setTryCount))
                userHasPassword === false && dispatch(checkEmail(values, setSubmitting, setOpenDialog))
              }}
            >
              {({ handleSubmit, isSubmitting, errors, values, touched, handleChange, handleBlur }) => (
              <div  className='form-container'>

                <ResetPasswordDialog 
                    open={openDialog} 
                    setOpen={setOpenDialog} 
                    hasPassword={userHasPassword}
                    values={values}
                />

                <Card className='form-card' elevation={8}>
                 
                    <Form className='form'>

                      <Typography style={{margin: '5px 0px 25px 0px'}}  variant='h4'> Iniciar Sesión </Typography>

                      <TextField
                          variant='outlined'
                          className={classes.textField}
                          error={errors.email && touched.email}
                          id='email'
                          name='email'
                          type='email'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          helperText={(errors.email && touched.email) && errors.email}
                          label='Correo Electrónico'
                      />
                      { userHasPassword &&   
                      
                      <TextField
                          variant='outlined'
                         
                          error={(errors.password || touched.password) && errors.password}
                          id='password'
                          name='password'
                          type='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          helperText={(errors.password || touched.password) && errors.password}
                          label='Contraseña'
                      /> 
                      }
                           { tryCount >= 1 && <p style={{fontFamily: 'Open Sans', marginTop: 20 }}> Olvidaste tu contraseña? haz click <span onClick={() => setOpenDialog(true)} style={{color: 'blue', cursor: 'pointer'}}> Aquí </span> para recuperarla. </p>} 
                       
                      <Button
                          disabled={isSubmitting}
                          type='submit'
                          onClick={handleSubmit}
                          variant='contained'
                          color='primary'
                          style={{marginTop: 15}}
                      >
                      Iniciar Sesión
                      </Button>
                      
                      { serverErrors && <p style={{color: 'red', fontFamily: 'Open Sans', textAlign: 'center'}}> {serverErrors} </p> }

                      <a style={{cursor: 'pointer', textDecoration: 'none', margin: '10px 0px', }} href='http://localhost:5000/api/user/asd'>
                        <Button variant='contained' color='secondary' style={{width: '100%' }}>
                          < FacebookIcon style={{margin: 0, padding: 0}} /> <p style={{margin: '0px 0px 0px 15px', padding: 0}} > Iniciar sesión con Facebook </p>
                        </Button>
                      </a> 
                      <a style={{cursor: 'pointer', textDecoration: 'none', margin: '10px 0px', }} href='http://localhost:5000/api/user/asdfg'>
                        <Button variant='outlined' color='primary' style={{width: '100%' }}>
                          < FacebookIcon style={{margin: 0, padding: 0}} /> <p style={{margin: '0px 0px 0px 15px', padding: 0}} > Iniciar sesión con Google </p>
                        </Button>
                      </a> 
                      <p className='auth-p'> No tienes una cuenta?
                        <Link 
                          style={{textDecoration: 'none', color: '#046B86'}} 
                          to='/Register'> Registrate Aquí
                        </Link>
                      </p>
                    </Form>
                    <img src={landingImage} alt='landing'className='auth-image' />
              
                </Card>
              { isSubmitting && <LoadingAuthentication /> }
              </div>  
              )}
      </Formik>
  )    
} 
